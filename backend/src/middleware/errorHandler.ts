import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/errors';
import { MongoError } from 'mongodb';
import { Error as MongooseError } from 'mongoose';

export const errorHandler = (
  err: Error | AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
      ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
  }

  // Handle Mongoose validation errors
  if (err instanceof MongooseError.ValidationError) {
    const errors = Object.values(err.errors).map(error => error.message);
    return res.status(400).json({
      status: 'error',
      message: 'Validation Error',
      errors
    });
  }

  // Handle MongoDB duplicate key errors
  if (err instanceof MongoError && err.code === 11000) {
    return res.status(400).json({
      status: 'error',
      message: 'Duplicate field value entered'
    });
  }

  // Handle JWT errors
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({
      status: 'error',
      message: 'Invalid token'
    });
  }

  // Handle JWT expiration
  if (err.name === 'TokenExpiredError') {
    return res.status(401).json({
      status: 'error',
      message: 'Token expired'
    });
  }

  // Default error
  console.error('Unhandled error:', err);
  return res.status(500).json({
    status: 'error',
    message: 'Internal server error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
};