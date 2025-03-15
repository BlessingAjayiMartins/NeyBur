# Neybur Backend

Modern backend implementation for the Neybur social platform - a location-based message board where users can share text and media content.

## Features

- User authentication (registration/login)
- Location-based post discovery
- Media upload support (images and videos)
- Post interaction (likes and comments)
- Radius-based content filtering
- Global and local post visibility

## Tech Stack

- Node.js + Express.js
- TypeScript
- MongoDB with Mongoose
- JWT Authentication
- Cloudinary for media storage
- Geospatial queries support

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create environment file:
   ```bash
   cp .env.example .env
   ```
   Then fill in your environment variables in `.env`

3. Make sure MongoDB is running locally or update MONGODB_URI in `.env`

4. Start development server:
   ```bash
   npm run dev
   ```

## API Endpoints

### Authentication
- POST `/api/auth/register` - Register new user
- POST `/api/auth/login` - Login user

### Posts
- POST `/api/posts` - Create new post
- GET `/api/posts/nearby` - Get posts near location
- GET `/api/posts/global` - Get global posts
- POST `/api/posts/:postId/like` - Like/unlike post
- POST `/api/posts/:postId/comment` - Comment on post

### Media
- POST `/api/media/upload` - Upload media files

## Development

- Build: `npm run build`
- Test: `npm test`
- Start production: `npm start`
