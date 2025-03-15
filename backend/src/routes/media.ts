import express, { Response } from 'express';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import { auth, AuthRequest } from '../middleware/auth';

export const mediaRoutes = express.Router();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configure multer for memory storage
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/') || file.mimetype.startsWith('video/')) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only images and videos are allowed.'));
    }
  },
});

// Upload media
mediaRoutes.post('/upload', auth, upload.array('media', 4), async (req: AuthRequest, res: Response) => {
  try {
    if (!req.files || !Array.isArray(req.files)) {
      return res.status(400).json({ message: 'No files uploaded' });
    }

    const uploadPromises = (req.files as Express.Multer.File[]).map(async (file) => {
      // Convert file buffer to base64
      const base64Data = file.buffer.toString('base64');
      const dataURI = `data:${file.mimetype};base64,${base64Data}`;

      // Upload to Cloudinary
      const result = await cloudinary.uploader.upload(dataURI, {
        resource_type: 'auto',
        folder: 'neybur',
        public_id: `${req.user._id}_${Date.now()}`,
      });

      return result.secure_url;
    });

    const mediaUrls = await Promise.all(uploadPromises);
    res.json({ mediaUrls });
  } catch (error) {
    console.error('Media upload error:', error);
    res.status(500).json({ message: 'Error uploading media' });
  }
});
