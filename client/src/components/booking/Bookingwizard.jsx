import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import { useBookingStore } from '@/store/useBookingStore';
import { bookingService } from '@/services/bookingService';
import { formatDate, formatTime, formatCurrency } from '@/utils/formatDate';
import ServicePicker from './ServicePicker';
import StylistPicker from './StylistPicker';
import DateTimePicker from './DateTimePicker';
import Button from '@/components/common/Button';

const STEPS = ['Service', 'Stylist', 'Date & Time', 'Confirm'];

const BookingWizard = () => {
  const navigate = useNavigate();
  const {
    currentStep, selectedService, selectedStylist,
    selectedDate, selectedTimeSlot, notes,
    setNotes, resetBooking,
  } = useBookingStore();
  const [submitting, setSubmitting] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [error, setError] = useState('');

  const handleConfirm = async () => {
    setSubmitting(true);
    setError('');
    try {
      await bookingService.create({
        serviceId:  selectedService._id,
        stylistId:  selectedStylist._id,
        date:       selectedDate,
        timeSlot:   selectedTimeSlot,
        notes,
      });
      setConfirmed(true);
      resetBooking();
    } catch (err) {
      setError(err.response?.data?.message || 'Booking failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (confirmed) {
    return (
      <div className="text-center py-12">
        <div className="flex justify-center mb-4">
          <CheckCircle size={64} className="text-green-500" />
        </div>
        <h2 className="font-serif text-3xl text-charcoal-800 mb-3">Booking Confirmed!</h2>
        <p className="text-charcoal-600 font-sans mb-8">
          Your appointment is pending confirmation from our team. We'll be in touch soon!
        </p>
        <div className="flex justify-center gap-4">
          <Button variant="outline" onClick={() => navigate('/')}>Go Home</Button>
          <Button onClick={() => { setConfirmed(false); navigate('/booking'); }}>
            Book Another
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      {/* Step indicator */}
      <div className="flex items-center justify-between mb-10">
        {STEPS.map((step, index) => {
          const stepNum = index + 1;
          const isCompleted = currentStep > stepNum;
          const isCurrent = currentStep === stepNum;
          return (
            <div key={step} className="flex items-center flex-1 last:flex-none">
              <div className="flex flex-col items-center">
                <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-sans font-medium transition-all ${
                  isCompleted ? 'bg-gold-500 text-white'
                  : isCurrent  ? 'bg-charcoal-800 text-white'
                  :              'bg-cream-200 text-charcoal-500'
                }`}>
                  {isCompleted ? <CheckCircle size={16} /> : stepNum}
                </div>
                <span className={`text-xs mt-2 font-sans ${isCurrent ? 'text-gold-600 font-medium' : 'text-charcoal-400'}`}>
                  {step}
                </span>
              </div>
              {index < STEPS.length - 1 && (
                <div className={`flex-1 h-px mx-3 mb-4 transition-all ${currentStep > stepNum ? 'bg-gold-400' : 'bg-cream-200'}`} />
              )}
            </div>
          );
        })}
      </div>

      {/* Step content */}
      <div className="bg-white rounded-2xl border border-cream-200 shadow-card p-6 sm:p-8">
        {currentStep === 1 && <ServicePicker />}
        {currentStep === 2 && <StylistPicker />}
        {currentStep === 3 && <DateTimePicker />}

        {/* Step 4 — Confirmation */}
        {currentStep === 4 && (
          <div>
            <h3 className="font-serif text-2xl text-charcoal-800 mb-6">Review Your Booking</h3>

            <div className="bg-cream-50 rounded-xl p-5 mb-6 space-y-3">
              {[
                ['Service',  selectedService?.name],
                ['Price',    formatCurrency(selectedService?.price)],
                ['Duration', `${selectedService?.duration} minutes`],
                ['Stylist',  selectedStylist?.name],
                ['Date',     selectedDate ? formatDate(selectedDate) : ''],
                ['Time',     selectedTimeSlot ? formatTime(selectedTimeSlot) : ''],
              ].map(([label, value]) => (
                <div key={label} className="flex justify-between text-sm font-sans">
                  <span className="text-charcoal-500">{label}</span>
                  <span className="text-charcoal-800 font-medium">{value}</span>
                </div>
              ))}
            </div>

            <div className="mb-6">
              <label className="block text-sm font-sans text-charcoal-600 mb-2">
                Notes for your stylist (optional)
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Any preferences, allergies, or special requests..."
                rows={3}
                className="w-full px-4 py-3 rounded-xl border border-cream-200 font-sans text-charcoal-700 focus:outline-none focus:ring-2 focus:ring-gold-400 resize-none"
              />
            </div>

            {error && (
              <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-100 text-sm text-red-600 font-sans">
                {error}
              </div>
            )}

            <div className="flex gap-3">
              <Button variant="outline" onClick={() => useBookingStore.getState().prevStep()}>
                Back
              </Button>
              <Button onClick={handleConfirm} loading={submitting} className="flex-1">
                Confirm Booking
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingWizard;