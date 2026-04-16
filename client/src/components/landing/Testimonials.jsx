import { Star } from 'lucide-react';

const reviews = [
  { name: 'Sarah Mitchell', role: 'Regular Client', rating: 5, text: 'Absolutely incredible experience. The balayage they gave me was exactly what I envisioned. I get compliments every single day!' },
  { name: 'Priya Sharma',   role: 'New Client',     rating: 5, text: 'I came in for a HydraFacial and left feeling like a completely new person. The staff are so attentive and professional.' },
  { name: 'Emma Williams',  role: 'Loyal Client',   rating: 5, text: 'Luxe Beauty is simply the best salon in the city. The ambiance, the team, the results — everything is 10/10.' },
];

const Stars = ({ count }) => (
  <div className="flex gap-1">
    {[...Array(count)].map((_, i) => (
      <Star key={i} size={14} className="text-gold-400 fill-gold-400" />
    ))}
  </div>
);

const Testimonials = () => (
  <section className="section-padding bg-charcoal-800">
    <div className="container-custom">
      <div className="text-center mb-12">
        <p className="font-sans text-sm tracking-widest text-gold-400 uppercase mb-3">Client Love</p>
        <h2 className="font-serif text-4xl text-white">What They Say</h2>
        <div className="w-16 h-px bg-gold-400 mx-auto mt-4" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {reviews.map(({ name, role, rating, text }) => (
          <div
            key={name}
            className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors"
          >
            <Stars count={rating} />
            <p className="font-sans text-cream-200 text-sm leading-relaxed mt-4 mb-6 italic">
              "{text}"
            </p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gold-500 flex items-center justify-center text-white font-serif text-sm">
                {name.charAt(0)}
              </div>
              <div>
                <p className="font-sans text-white text-sm font-medium">{name}</p>
                <p className="font-sans text-cream-300 text-xs">{role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Testimonials;