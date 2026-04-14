import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    category: {
      type: String,
      enum: ['Hair', 'Nails', 'Skin', 'Makeup', 'Wellness'],
      required: true,
    },
    description: { type: String, trim: true },
    price: { type: Number, required: true, min: 0 },
    duration: { type: Number, required: true }, // minutes
    image: { type: String, default: '' },       // Unsplash URL
    isActive: { type: Boolean, default: true }, // toggle in dashboard
    stylistIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  },
  { timestamps: true }
);

export default mongoose.model('Service', serviceSchema);