import express, { Response } from 'express';
import { body, validationResult } from 'express-validator';
import { auth, AuthRequest } from '../middleware/auth';
import { Post } from '../models/Post';

export const postRoutes = express.Router();

// Create post validation
const createPostValidation = [
  body('content').trim().notEmpty().withMessage('Content cannot be empty')
    .isLength({ max: 2000 }).withMessage('Content must be less than 2000 characters'),
  body('location.coordinates').isArray().withMessage('Location coordinates required'),
  body('visibility').isIn(['public', 'local']).withMessage('Invalid visibility option'),
];

// Create a new post
postRoutes.post('/', auth, createPostValidation, async (req: AuthRequest, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { content, mediaUrls, location, visibility, radius } = req.body;

    const post = new Post({
      author: req.user._id,
      content,
      mediaUrls: mediaUrls || [],
      location,
      visibility,
      radius: radius || 5000,
    });

    await post.save();

    await post.populate('author', 'username profilePicture');
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get posts within radius
postRoutes.get('/nearby', auth, async (req: AuthRequest, res: Response) => {
  try {
    const { longitude, latitude, radius = 5000 } = req.query;

    const posts = await Post.find({
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [Number(longitude), Number(latitude)],
          },
          $maxDistance: Number(radius),
        },
      },
    })
    .populate('author', 'username profilePicture')
    .sort('-createdAt')
    .limit(50);

    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get global posts
postRoutes.get('/global', auth, async (req: AuthRequest, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = 20;

    const posts = await Post.find({ visibility: 'public' })
      .populate('author', 'username profilePicture')
      .sort('-createdAt')
      .skip((page - 1) * limit)
      .limit(limit);

    const total = await Post.countDocuments({ visibility: 'public' });

    res.json({
      posts,
      page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Like/Unlike a post
postRoutes.post('/:postId/like', auth, async (req: AuthRequest, res: Response) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    const likeIndex = post.likes.indexOf(req.user._id);
    if (likeIndex > -1) {
      post.likes.splice(likeIndex, 1);
    } else {
      post.likes.push(req.user._id);
    }

    await post.save();
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Add comment
postRoutes.post('/:postId/comment', auth, [
  body('content').trim().notEmpty().withMessage('Comment cannot be empty')
    .isLength({ max: 500 }).withMessage('Comment must be less than 500 characters'),
], async (req: AuthRequest, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const post = await Post.findById(req.params.postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    post.comments.push({
      author: req.user._id,
      content: req.body.content,
      createdAt: new Date(),
    });

    await post.save();
    await post.populate('comments.author', 'username profilePicture');
    
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});
