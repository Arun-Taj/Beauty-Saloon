import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema(
  {
    client: {
      type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true,
    },
    stylist: {
      type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true,
    },
    service: {
      type: mongoose.Schema.Types.ObjectId, ref: 'Service', required: true,
    },
    date: { type: Date, required: true },
    timeSlot: { type: String, required: true }, // e.g. "14:00"
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'cancelled', 'completed'],
      default: 'pending',
    },
    notes: { type: String, trim: true },        // client notes
    totalPrice: { type: Number, required: true },
    paymentStatus: {
      type: String,
      enum: ['unpaid', 'paid'],
      default: 'unpaid',
    },
  },
  { timestamps: true }
);

// Compound index: prevents double-booking a stylist
appointmentSchema.index({ stylist: 1, date: 1, timeSlot: 1 }, { unique: true });

export default mongoose.model('Appointment', appointmentSchema);