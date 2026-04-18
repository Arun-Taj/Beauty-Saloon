import { useEffect, useState } from 'react';
import { Clock, DollarSign } from 'lucide-react';
import { serviceService } from '@/services/serviceService';
import { useServiceStore } from '@/store/useServiceStore';
import { Link } from 'react-router-dom';
import Button from '@/components/common/Button';
import Hair1 from '../../assets/Hair1.jpeg'
import Hair2 from '../../assets/Hair2.jpeg'
import Keratin from '../../assets/Keratin.jpeg'

const CATEGORIES = ['All', 'Hair', 'Nails', 'Skin', 'Makeup', 'Wellness'];

const ServiceMenu = () => {
  const { services, activeCategory, setServices, setCategory } = useServiceStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const res = await serviceService.getAll(activeCategory);
        setServices(res.data.data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [activeCategory]);

  return (
    <section id="services" className="section-padding bg-white">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="font-sans text-sm tracking-widest text-gold-500 uppercase mb-3">Our Offerings</p>
          <h2 className="font-serif text-4xl text-charcoal-800">Signature Services</h2>
          <div className="w-16 h-px bg-gold-400 mx-auto mt-4" />
        </div>

        {/* Category tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-sans transition-all duration-200 ${
                activeCategory === cat
                  ? 'bg-gold-500 text-white shadow-luxury'
                  : 'bg-cream-100 text-charcoal-600 hover:bg-cream-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Services grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-64 rounded-2xl bg-cream-100 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <div
                key={service._id}
                className="group rounded-2xl overflow-hidden border border-cream-200 hover:shadow-luxury transition-all duration-300 bg-white"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 bg-gold-500 text-white text-xs font-sans px-3 py-1 rounded-full">
                    {service.category}
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="font-serif text-lg text-charcoal-800 mb-2">{service.name}</h3>
                  <p className="text-sm text-charcoal-600 font-sans mb-4 line-clamp-2">{service.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 text-sm text-charcoal-600">
                      <span className="flex items-center gap-1"><DollarSign size={14} className="text-gold-500" />{service.price}</span>
                      <span className="flex items-center gap-1"><Clock size={14} className="text-gold-500" />{service.duration}min</span>
                    </div>
                    <Link to="/booking" state={{ preselectedService: service }}>
                      <Button size="sm" variant="outline">Book</Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ServiceMenu;