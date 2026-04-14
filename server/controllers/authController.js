import User from '../models/User.js';
import generateToken from '../utils/generateToken.js';
import { sendError, sendSuccess } from '../utils/errorHandler.js';

// @desc    Register a new client
// @route   POST /api/auth/register
// @access  Public
export const register = async (req, res, next) => {
  try {
    const { name, email, password, phone } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return sendError(res, 400, 'Email already registered');
    }

    const user = await User.create({ name, email, password, phone });
    const token = generateToken(user._id);

    return sendSuccess(res, 201, {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token,
    }, 'Registration successful');
  } catch (error) {
    next(error);
  }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Explicitly select password (it's select: false in schema)
    const user = await User.findOne({ email }).select('+password');

    if (!user || !(await user.matchPassword(password))) {
      return sendError(res, 401, 'Invalid email or password');
    }

    if (!user.isActive) {
      return sendError(res, 403, 'Your account has been deactivated');
    }

    const token = generateToken(user._id);

    return sendSuccess(res, 200, {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      phone: user.phone,
      avatar: user.avatar,
      token,
    }, 'Login successful');
  } catch (error) {
    next(error);
  }
};

// @desc    Get currently logged-in user
// @route   GET /api/auth/me
// @access  Private
export const getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    return sendSuccess(res, 200, user);
  } catch (error) {
    next(error);
  }
};

// @desc    Update profile (name, phone, avatar)
// @route   PUT /api/auth/profile
// @access  Private
export const updateProfile = async (req, res, next) => {
  try {
    const { name, phone, avatar } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { name, phone, avatar },
      { new: true, runValidators: true }
    );

    return sendSuccess(res, 200, user, 'Profile updated');
  } catch (error) {
    next(error);
  }
};

// @desc    Change password
// @route   PUT /api/auth/change-password
// @access  Private
export const changePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;

    const user = await User.findById(req.user._id).select('+password');

    if (!(await user.matchPassword(currentPassword))) {
      return sendError(res, 401, 'Current password is incorrect');
    }

    user.password = newPassword;
    await user.save(); // triggers pre-save hash hook

    return sendSuccess(res, 200, null, 'Password changed successfully');
  } catch (error) {
    next(error);
  }
};

// @desc    Get all users (admin)
// @route   GET /api/auth/users
// @access  Private/Admin
export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    return sendSuccess(res, 200, users);
  } catch (error) {
    next(error);
  }
};

// @desc    Get all stylists (public - for booking wizard)
// @route   GET /api/auth/stylists
// @access  Public
export const getStylists = async (req, res, next) => {
  try {
    const stylists = await User.find({ role: 'stylist', isActive: true })
      .select('name avatar email phone');
    return sendSuccess(res, 200, stylists);
  } catch (error) {
    next(error);
  }
};