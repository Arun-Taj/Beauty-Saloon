import Appointment from '../models/Appointment.js';
import Service from '../models/Service.js';
import { sendError, sendSuccess } from '../utils/errorHandler.js';

// Helper: generate available time slots for a day
const ALL_SLOTS = [
  '09:00','09:30','10:00','10:30','11:00','11:30',
  '12:00','12:30','13:00','13:30','14:00','14:30',
  '15:00','15:30','16:00','16:30','17:00','17:30',
];

// @desc    Get available time slots for a stylist on a date
// @route   GET /api/appointments/slots?stylistId=&date=
// @access  Public
export const getAvailableSlots = async (req, res, next) => {
  try {
    const { stylistId, date } = req.query;

    if (!stylistId || !date) {
      return sendError(res, 400, 'stylistId and date are required');
    }

    const dayStart = new Date(date);
    dayStart.setHours(0, 0, 0, 0);
    const dayEnd = new Date(date);
    dayEnd.setHours(23, 59, 59, 999);

    // Find all booked (non-cancelled) slots for this stylist on this date
    const booked = await Appointment.find({
      stylist: stylistId,
      date: { $gte: dayStart, $lte: dayEnd },
      status: { $in: ['pending', 'confirmed'] },
    }).select('timeSlot');

    const bookedSlots = booked.map((a) => a.timeSlot);
    const available = ALL_SLOTS.filter((s) => !bookedSlots.includes(s));

    return sendSuccess(res, 200, { date, available, booked: bookedSlots });
  } catch (error) {
    next(error);
  }
};

// @desc    Create a new appointment (client books)
// @route   POST /api/appointments
// @access  Private
export const createAppointment = async (req, res, next) => {
  try {
    const { serviceId, stylistId, date, timeSlot, notes } = req.body;

    // Fetch service to copy current price
    const service = await Service.findById(serviceId);
    if (!service || !service.isActive) {
      return sendError(res, 404, 'Service not found or unavailable');
    }

    // Check slot is still free (race condition guard)
    const dayStart = new Date(date);
    dayStart.setHours(0, 0, 0, 0);
    const dayEnd = new Date(date);
    dayEnd.setHours(23, 59, 59, 999);

    const conflict = await Appointment.findOne({
      stylist: stylistId,
      date: { $gte: dayStart, $lte: dayEnd },
      timeSlot,
      status: { $in: ['pending', 'confirmed'] },
    });

    if (conflict) {
      return sendError(res, 409, 'This time slot has just been booked. Please choose another.');
    }

    const appointment = await Appointment.create({
      client: req.user._id,
      stylist: stylistId,
      service: serviceId,
      date: new Date(date),
      timeSlot,
      notes,
      totalPrice: service.price,
    });

    await appointment.populate([
      { path: 'service', select: 'name category duration price' },
      { path: 'stylist', select: 'name avatar' },
      { path: 'client', select: 'name email phone' },
    ]);

    return sendSuccess(res, 201, appointment, 'Appointment booked successfully');
  } catch (error) {
    next(error);
  }
};

// @desc    Get all appointments for the logged-in client
// @route   GET /api/appointments/my
// @access  Private
export const getMyAppointments = async (req, res, next) => {
  try {
    const appointments = await Appointment.find({ client: req.user._id })
      .populate('service', 'name category duration price image')
      .populate('stylist', 'name avatar')
      .sort({ date: -1 });

    return sendSuccess(res, 200, appointments);
  } catch (error) {
    next(error);
  }
};

// @desc    Cancel an appointment (client cancels their own)
// @route   PUT /api/appointments/:id/cancel
// @access  Private
export const cancelAppointment = async (req, res, next) => {
  try {
    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) return sendError(res, 404, 'Appointment not found');

    // Clients can only cancel their own
    if (appointment.client.toString() !== req.user._id.toString()) {
      return sendError(res, 403, 'Not authorized to cancel this appointment');
    }

    if (['cancelled', 'completed'].includes(appointment.status)) {
      return sendError(res, 400, `Appointment is already ${appointment.status}`);
    }

    appointment.status = 'cancelled';
    appointment.cancelReason = req.body.reason || 'Cancelled by client';
    await appointment.save();

    return sendSuccess(res, 200, appointment, 'Appointment cancelled');
  } catch (error) {
    next(error);
  }
};

// ─── ADMIN ROUTES ──────────────────────────────────────────────────────────

// @desc    Get all appointments with filters
// @route   GET /api/appointments/admin/all
// @access  Private/Admin
export const getAllAppointments = async (req, res, next) => {
  try {
    const { status, date, stylistId, page = 1, limit = 20 } = req.query;
    const filter = {};

    if (status) filter.status = status;
    if (stylistId) filter.stylist = stylistId;
    if (date) {
      const d = new Date(date);
      filter.date = {
        $gte: new Date(d.setHours(0, 0, 0, 0)),
        $lte: new Date(d.setHours(23, 59, 59, 999)),
      };
    }

    const total = await Appointment.countDocuments(filter);
    const appointments = await Appointment.find(filter)
      .populate('client', 'name email phone')
      .populate('stylist', 'name avatar')
      .populate('service', 'name category price duration')
      .sort({ date: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    return sendSuccess(res, 200, {
      appointments,
      pagination: {
        total,
        page: Number(page),
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update appointment status (admin confirms/cancels/completes)
// @route   PUT /api/appointments/admin/:id/status
// @access  Private/Admin
export const updateAppointmentStatus = async (req, res, next) => {
  try {
    const { status, cancelReason } = req.body;
    const validStatuses = ['pending', 'confirmed', 'cancelled', 'completed'];

    if (!validStatuses.includes(status)) {
      return sendError(res, 400, 'Invalid status value');
    }

    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      { status, ...(cancelReason && { cancelReason }) },
      { new: true }
    )
      .populate('client', 'name email')
      .populate('stylist', 'name')
      .populate('service', 'name price');

    if (!appointment) return sendError(res, 404, 'Appointment not found');

    return sendSuccess(res, 200, appointment, `Appointment marked as ${status}`);
  } catch (error) {
    next(error);
  }
};

// @desc    Get dashboard stats
// @route   GET /api/appointments/admin/stats
// @access  Private/Admin
export const getDashboardStats = async (req, res, next) => {
  try {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    const [
      totalBookings,
      pendingCount,
      confirmedCount,
      completedCount,
      cancelledCount,
      monthlyRevenue,
      totalRevenue,
      recentAppointments,
    ] = await Promise.all([
      Appointment.countDocuments(),
      Appointment.countDocuments({ status: 'pending' }),
      Appointment.countDocuments({ status: 'confirmed' }),
      Appointment.countDocuments({ status: 'completed' }),
      Appointment.countDocuments({ status: 'cancelled' }),

      // Revenue this month (completed only)
      Appointment.aggregate([
        {
          $match: {
            status: 'completed',
            createdAt: { $gte: startOfMonth },
          },
        },
        { $group: { _id: null, total: { $sum: '$totalPrice' } } },
      ]),

      // All-time revenue
      Appointment.aggregate([
        { $match: { status: 'completed' } },
        { $group: { _id: null, total: { $sum: '$totalPrice' } } },
      ]),

      // 5 most recent appointments
      Appointment.find()
        .populate('client', 'name')
        .populate('service', 'name')
        .populate('stylist', 'name')
        .sort({ createdAt: -1 })
        .limit(5),
    ]);

    return sendSuccess(res, 200, {
      bookings: {
        total: totalBookings,
        pending: pendingCount,
        confirmed: confirmedCount,
        completed: completedCount,
        cancelled: cancelledCount,
      },
      revenue: {
        thisMonth: monthlyRevenue[0]?.total || 0,
        allTime: totalRevenue[0]?.total || 0,
      },
      recentAppointments,
    });
  } catch (error) {
    next(error);
  }
};