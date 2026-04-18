import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const BookingCTA = () => (
  <section className="relative bg-ink overflow-hidden px-8 sm:px-14 lg:px-16 py-24">
    {/* Ambient glow */}
    <div className="absolute right-0 top-0 w-[600px] h-[600px] -translate-y-1/2 translate-x-1/4
                    rounded-full bg-gold/5 blur-3xl pointer-events-none" />

    <div className="container-max flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10">
      <div>
        <div className="eyebrow mb-6" style={{ color: '#C9A84C' }}>
          <span className="text-gold">Reserve Your Moment</span>
        </div>
        <h2 className="font-serif font-light text-white leading-tight"
            style={{ fontSize: 'clamp(36px,4vw,60px)' }}>
          Ready to Feel<br />
          <em className="text-gold-light not-italic">Extraordinary?</em>
        </h2>
        <p className="font-sans text-sm text-white/40 mt-4">
          Limited appointment slots available — book yours today.
        </p>
      </div>

      <Link to="/booking"
        className="btn-gold group inline-flex items-center gap-3 shrink-0 text-base py-5 px-12">
        Book Your Visit
        <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
      </Link>
    </div>
  </section>
);

export default BookingCTA;