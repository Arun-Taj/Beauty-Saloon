import mongoose from 'mongoose';
import dotenv from 'dotenv';
//import User from '../models/User.js';
import Service from '../models/Service.js';

dotenv.config();

const services = [
  { name: 'Signature Blowout',   category: 'Hair',    price: 65,  duration: 60,  description: 'Luxury blow-dry with scalp massage.' },
  { name: 'Balayage Highlights', category: 'Hair',    price: 180, duration: 150, description: 'Hand-painted natural highlights.' },
  { name: 'Keratin Treatment',   category: 'Hair',    price: 220, duration: 180, description: 'Smoothing treatment for frizz-free hair.' },
  { name: 'Gel Manicure',        category: 'Nails',   price: 45,  duration: 60,  description: 'Long-lasting gel polish with cuticle care.' },
  { name: 'Luxury Pedicure',     category: 'Nails',   price: 55,  duration: 75,  description: 'Spa pedicure with paraffin wax treatment.' },
  { name: 'HydraFacial',         category: 'Skin',    price: 150, duration: 60,  description: 'Deep cleansing hydrating facial.' },
  { name: 'Bridal Makeup',       category: 'Makeup',  price: 200, duration: 120, description: 'Full bridal glam with airbrush finish.' },
  { name: 'Hot Stone Massage',   category: 'Wellness',price: 120, duration: 90,  description: 'Relaxing full-body hot stone therapy.' },
];

const seed = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('Connected to DB');

  //await User.deleteMany();
  await Service.deleteMany();

  // Create admin
//   await User.create({
//     name: 'Salon Admin',
//     email: 'admin@beautysalon.com',
//     password: 'admin123',
//     role: 'admin',
//   });

  // Create a stylist
//   const stylist = await User.create({
//     name: 'Sophia Reeves',
//     email: 'sophia@beautysalon.com',
//     password: 'stylist123',
//     role: 'stylist',
//     avatar: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=150',
//   });

  // Attach stylist to all services
//   const seededServices = services.map((s) => ({
//     ...s,
//     stylistIds: [stylist._id],
//   }));
const seededServices = services.map((s) => ({
  ...s,
  stylistIds: [], // empty for now
}));

  await Service.insertMany(seededServices);
    console.log('Seeded: 8 services');
  //console.log('Seeded: 1 admin, 1 stylist, 8 services');
  process.exit(0);
};

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});