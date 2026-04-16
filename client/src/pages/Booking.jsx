import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store/useAuthStore';
import BookingWizard from '@/components/booking/BookingWizard';

const Booking = () => {
  const { isAuthenticated } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) navigate('/login', { state: { from: { pathname: '/booking' } } });
  }, [isAuthenticated]);

  return (
    <div className="min-h-screen bg-cream-50 pt-24 pb-16">
      <div className="container-custom">
        <div className="text-center mb-10">
          <p className="font-sans text-sm tracking-widest text-gold-500 uppercase mb-2">Reserve Your Spot</p>
          <h1 className="font-serif text-4xl text-charcoal-800">Book an Appointment</h1>
          <div className="w-16 h-px bg-gold-400 mx-auto mt-4" />
        </div>
        <BookingWizard />
      </div>
    </div>
  );
};

export default Booking;