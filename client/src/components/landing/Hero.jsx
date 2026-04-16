import { Link } from 'react-router-dom';
import { ArrowRight, Star } from 'lucide-react';
import Button from '@/components/common/Button';
import Bg from '../../assets/bg2.jpeg'

const Hero = () => (
  <section className="relative min-h-screen flex items-center overflow-hidden">
    {/* Background image */}
    <div
      className="absolute inset-0 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${Bg})` }}
    >
      <div className="absolute inset-0 bg-charcoal-900/55" />
    </div>

    <div className="relative container-custom text-white pt-16">
      <div className="max-w-2xl">
        {/* Tag */}
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6">
          <Star size={14} className="text-gold-400 fill-gold-400" />
          <span className="text-sm font-sans text-cream-100">Rated #1 Salon in the City</span>
        </div>

        <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl leading-tight mb-6 text-white">
          Where Beauty
          <br />
          <span className="text-gold-400 italic">Meets Artistry</span>
        </h1>

        <p className="font-sans text-lg text-cream-200 mb-10 leading-relaxed max-w-xl">
          Experience luxury beauty services tailored just for you. From signature blowouts to transformative skincare — your glow starts here.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <Link to="/booking">
            <Button size="lg" className="group">
              Book an Appointment
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
          <a href="#services">
            <Button size="lg" variant="outline" className="border-white/50 text-white hover:bg-white/10">
              Explore Services
            </Button>
          </a>
        </div>

        {/* Stats */}
        <div className="flex gap-10 mt-14">
          {[['500+', 'Happy Clients'], ['15+', 'Expert Stylists'], ['10+', 'Years Experience']].map(
            ([num, label]) => (
              <div key={label}>
                <p className="font-serif text-3xl text-gold-400">{num}</p>
                <p className="font-sans text-sm text-cream-200 mt-1">{label}</p>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  </section>
);

export default Hero;