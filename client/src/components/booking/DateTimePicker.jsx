import { useEffect, useState } from 'react';
import { bookingService } from '@/services/bookingService';
import { useBookingStore } from '@/store/useBookingStore';
import { formatTime } from '@/utils/formatDate';
import Button from '@/components/common/Button';

const DateTimePicker = () => {
  const { selectedStylist, selectedDate, selectedTimeSlot, setDate, setTimeSlot, nextStep, prevStep } = useBookingStore();
  const [slots, setSlots] = useState({ available: [], booked: [] });
  const [loading, setLoading] = useState(false);

  // Min date = tomorrow
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

  useEffect(() => {
    if (!selectedDate || !selectedStylist) return;
    setLoading(true);
    bookingService
      .getSlots(selectedStylist._id, selectedDate)
      .then((res) => setSlots(res.data.data))
      .finally(() => setLoading(false));
  }, [selectedDate, selectedStylist]);

  return (
    <div>
      <h3 className="font-serif text-2xl text-charcoal-800 mb-6">Pick a Date & Time</h3>

      {/* Date picker */}
      <div className="mb-6">
        <label className="block text-sm font-sans text-charcoal-600 mb-2">Select Date</label>
        <input
          type="date"
          min={minDate}
          value={selectedDate || ''}
          onChange={(e) => setDate(e.target.value)}
          className="w-full sm:w-64 px-4 py-3 rounded-xl border border-cream-200 font-sans text-charcoal-700 focus:outline-none focus:ring-2 focus:ring-gold-400 bg-white"
        />
      </div>

      {/* Time slots */}
      {selectedDate && (
        <div className="mb-6">
          <label className="block text-sm font-sans text-charcoal-600 mb-3">
            Available Times {loading && <span className="text-gold-500 ml-2">Loading...</span>}
          </label>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
            {slots.available.map((slot) => (
              <button
                key={slot}
                onClick={() => setTimeSlot(slot)}
                className={`py-2 px-3 rounded-lg text-sm font-sans transition-all ${
                  selectedTimeSlot === slot
                    ? 'bg-gold-500 text-white shadow-luxury'
                    : 'bg-cream-100 text-charcoal-700 hover:bg-gold-100'
                }`}
              >
                {formatTime(slot)}
              </button>
            ))}
            {slots.booked.map((slot) => (
              <button
                key={slot}
                disabled
                className="py-2 px-3 rounded-lg text-sm font-sans bg-cream-200 text-charcoal-400 line-through cursor-not-allowed"
              >
                {formatTime(slot)}
              </button>
            ))}
          </div>
          {!loading && slots.available.length === 0 && (
            <p className="text-sm text-rose-500 font-sans mt-3">
              No available slots for this date. Please try another day.
            </p>
          )}
        </div>
      )}

      <div className="flex gap-3">
        <Button variant="outline" onClick={prevStep}>Back</Button>
        <Button onClick={nextStep} disabled={!selectedDate || !selectedTimeSlot}>
          Review Booking
        </Button>
      </div>
    </div>
  );
};

export default DateTimePicker;