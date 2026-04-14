import Service from '../models/Service.js';
import { sendError, sendSuccess } from '../utils/errorHandler.js';

// @desc    Get all active services (optionally filter by category)
// @route   GET /api/services
// @access  Public
export const getServices = async (req, res, next) => {
  try {
    const { category } = req.query;
    const filter = { isActive: true };
    if (category && category !== 'All') filter.category = category;

    const services = await Service.find(filter)
      .populate('stylistIds', 'name avatar')
      .sort({ category: 1, name: 1 });

    return sendSuccess(res, 200, services);
  } catch (error) {
    next(error);
  }
};

// @desc    Get single service by ID
// @route   GET /api/services/:id
// @access  Public
export const getServiceById = async (req, res, next) => {
  try {
    const service = await Service.findById(req.params.id)
      .populate('stylistIds', 'name avatar');

    if (!service) return sendError(res, 404, 'Service not found');

    return sendSuccess(res, 200, service);
  } catch (error) {
    next(error);
  }
};

// @desc    Create a new service
// @route   POST /api/services
// @access  Private/Admin
export const createService = async (req, res, next) => {
  try {
    const service = await Service.create(req.body);
    return sendSuccess(res, 201, service, 'Service created successfully');
  } catch (error) {
    next(error);
  }
};

// @desc    Update a service
// @route   PUT /api/services/:id
// @access  Private/Admin
export const updateService = async (req, res, next) => {
  try {
    const service = await Service.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!service) return sendError(res, 404, 'Service not found');

    return sendSuccess(res, 200, service, 'Service updated successfully');
  } catch (error) {
    next(error);
  }
};

// @desc    Delete (soft-delete) a service
// @route   DELETE /api/services/:id
// @access  Private/Admin
export const deleteService = async (req, res, next) => {
  try {
    const service = await Service.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );

    if (!service) return sendError(res, 404, 'Service not found');

    return sendSuccess(res, 200, null, 'Service removed successfully');
  } catch (error) {
    next(error);
  }
};