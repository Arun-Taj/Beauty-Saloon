// Central error response helper
export const sendError = (res, statusCode, message) => {
  return res.status(statusCode).json({ success: false, message });
};

// Central success response helper
export const sendSuccess = (res, statusCode, data, message = 'Success') => {
  return res.status(statusCode).json({ success: true, message, data });
};

// Global Express error handler middleware (used in server.js)
export const globalErrorHandler = (err, req, res, next) => {
  console.error(err.stack);

  // Mongoose duplicate key
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    return sendError(res, 400, `${field} already exists`);
  }

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const messages = Object.values(err.errors).map((e) => e.message);
    return sendError(res, 400, messages.join(', '));
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    return sendError(res, 401, 'Invalid token');
  }
  if (err.name === 'TokenExpiredError') {
    return sendError(res, 401, 'Token expired, please login again');
  }

  sendError(res, err.statusCode || 500, err.message || 'Server error');
};