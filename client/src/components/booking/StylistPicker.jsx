import { useEffect, useState } from 'react';
import { Check } from 'lucide-react';
import { authService } from '@/services/authService';
import { useBookingStore } from '@/store/useBookingStore';
import Button from '@/components/common/Button';

const StylistPicker = () => {
  const { selectedStylist, setStylist, nextStep, prevStep } = useBookingStore();
  const [stylists, setStylists] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    authService.getStylists()
      .then((res) => setStylists(res.data.data))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <h3 className="font-serif text-2xl text-charcoal-800 mb-6">Choose Your Stylist</h3>

      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-40 rounded-xl bg-cream-100 animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
          {stylists.map((stylist) => {
            const isSelected = selectedStylist?._id === stylist._id;
            return (
              <button
                key={stylist._id}
                onClick={() => setStylist(stylist)}
                className={`relative flex flex-col items-center p-5 rounded-xl border-2 transition-all duration-200 ${
                  isSelected
                    ? 'border-gold-500 bg-gold-50 shadow-luxury'
                    : 'border-cream-200 hover:border-gold-300 bg-white'
                }`}
              >
                {isSelected && (
                  <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-gold-500 flex items-center justify-center">
                    <Check size={12} className="text-white" />
                  </div>
                )}
                <img
                  src={stylist.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(stylist.name)}&background=BF8F1E&color=fff`}
                  alt={stylist.name}
                  className="w-16 h-16 rounded-full object-cover mb-3 ring-2 ring-cream-200"
                />
                <p className="font-sans font-medium text-charcoal-800 text-sm text-center">{stylist.name}</p>
                <p className="text-xs text-charcoal-500 font-sans mt-1">Stylist</p>
              </button>
            );
          })}
        </div>
      )}

      <div className="flex gap-3">
        <Button variant="outline" onClick={prevStep}>Back</Button>
        <Button onClick={nextStep} disabled={!selectedStylist}>
          Continue to Date & Time
        </Button>
      </div>
    </div>
  );
};

export default StylistPicker;