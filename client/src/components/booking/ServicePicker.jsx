import { useEffect, useState } from 'react';
import { Clock, DollarSign, Check } from 'lucide-react';
import { serviceService } from '@/services/serviceService';
import { useBookingStore } from '@/store/useBookingStore';
import Button from '@/components/common/Button';

const CATEGORIES = ['All', 'Hair', 'Nails', 'Skin', 'Makeup', 'Wellness'];

const ServicePicker = () => {
  const { selectedService, setService, nextStep } = useBookingStore();
  const [services, setServices] = useState([]);
  const [category, setCategory] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const res = await serviceService.getAll(category);
        setServices(res.data.data);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [category]);

  return (
    <div>
      <h3 className="font-serif text-2xl text-charcoal-800 mb-6">Choose a Service</h3>

      {/* Category filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`px-4 py-1.5 rounded-full text-sm font-sans transition-all ${
              category === cat
                ? 'bg-gold-500 text-white'
                : 'bg-cream-100 text-charcoal-600 hover:bg-cream-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-28 rounded-xl bg-cream-100 animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          {services.map((service) => {
            const isSelected = selectedService?._id === service._id;
            return (
              <button
                key={service._id}
                onClick={() => setService(service)}
                className={`text-left p-4 rounded-xl border-2 transition-all duration-200 ${
                  isSelected
                    ? 'border-gold-500 bg-gold-50 shadow-luxury'
                    : 'border-cream-200 hover:border-gold-300 bg-white'
                }`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-sans font-medium text-charcoal-800">{service.name}</p>
                    <p className="text-xs text-charcoal-500 mt-1 font-sans">{service.category}</p>
                    <div className="flex items-center gap-3 mt-2 text-xs text-charcoal-600">
                      <span className="flex items-center gap-1"><DollarSign size={12} className="text-gold-500" />{service.price}</span>
                      <span className="flex items-center gap-1"><Clock size={12} className="text-gold-500" />{service.duration}min</span>
                    </div>
                  </div>
                  {isSelected && (
                    <div className="w-6 h-6 rounded-full bg-gold-500 flex items-center justify-center">
                      <Check size={14} className="text-white" />
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      )}

      <Button onClick={nextStep} disabled={!selectedService} className="w-full sm:w-auto">
        Continue to Stylist
      </Button>
    </div>
  );
};

export default ServicePicker;