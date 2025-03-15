import express, { Express } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import { postRoutes } from './routes/posts';
import { authRoutes } from './routes/auth';
import { mediaRoutes } from './routes/media';
import { AddressInfo, Server } from 'net';
import { errorHandler } from './middleware/errorHandler';

dotenv.config();

const app: Express = express();
const DEFAULT_PORT = 5000;
const MAX_PORT_ATTEMPTS = 10;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/posts', postRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/media', mediaRoutes);
app.use(errorHandler);


// Try to start server on an available port
const startServer = async (port: number, attempts: number = 0): Promise<number> => {
  if (attempts >= MAX_PORT_ATTEMPTS) {
    throw new Error('Unable to find an available port after maximum attempts');
  }

  return new Promise((resolve, reject) => {
    const server = app.listen(port)
      .once('listening', () => {
        const address = server.address() as AddressInfo;
        resolve(address.port);
      })
      .once('error', (err: NodeJS.ErrnoException) => {
        if (err.code === 'EADDRINUSE') {
          console.log(`Port ${port} is in use, trying ${port + 1}...`);
          startServer(port + 1, attempts + 1)
            .then(resolve)
            .catch(reject);
        } else {
          reject(err);
        }
      });
  });
};

// MongoDB connection with fallback
const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/neybur';
    
    if (mongoURI.includes('<db_password>')) {
      throw new Error('Database password not configured. Please update MONGODB_URI in .env file');
    }

    await mongoose.connect(mongoURI);
    console.log('Connected to MongoDB successfully');
    
    // Start server after successful DB connection
    const port = await startServer(DEFAULT_PORT);
    console.log(`Server running on port ${port}`);
  } catch (error: any) {
    console.error('MongoDB connection error:', error.message);
    if (error.message.includes('bad auth')) {
      console.error('Authentication failed. Please check your database credentials in .env file');
    } else if (error.message.includes('ECONNREFUSED')) {
      console.error('Could not connect to MongoDB. Is the database running?');
    }
    process.exit(1);
  }
};

// Connect to database
connectDB();
