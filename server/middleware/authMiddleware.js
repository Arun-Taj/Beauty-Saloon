import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { sendError } from '../utils/errorHandler.js';

// Verify JWT and attach user to request
export const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return sendError(res, 401, 'Not authorized, no token provided');
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Attach full user object (excluding password) to req
    req.user = await User.findById(decoded.id).select('-password');

    if (!req.user || !req.user.isActive) {
      return sendError(res, 401, 'User not found or deactivated');
    }

    next();
  } catch (error) {
    return sendError(res, 401, 'Not authorized, token failed');
  }
};