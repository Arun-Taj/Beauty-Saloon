import { sendError } from '../utils/errorHandler.js';

// Must be used AFTER protect middleware
export const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    return next();
  }
  return sendError(res, 403, 'Access denied: Admins only');
};

// Allow both admin and stylist
export const staffOnly = (req, res, next) => {
  if (req.user && ['admin', 'stylist'].includes(req.user.role)) {
    return next();
  }
  return sendError(res, 403, 'Access denied: Staff only');
};