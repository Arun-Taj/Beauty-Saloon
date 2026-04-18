import { useEffect, useRef, useState } from 'react';
import { Star } from 'lucide-react';

const baseReviews = [
  { name: 'Sarah Mitchell', role: 'Regular Client', rating: 5, text: 'Absolutely incredible experience. The balayage they gave me was exactly what I envisioned. I get compliments every single day!' },
  { name: 'Priya Sharma',   role: 'New Client',     rating: 5, text: 'I came in for a HydraFacial and left feeling like a completely new person. The staff are so attentive and professional.' },
  { name: 'Emma Williams',  role: 'Loyal Client',   rating: 5, text: 'Luxe Beauty is simply the best salon in the city. The ambiance, the team, the results — everything is 10/10.' },
];

const reviews = [...baseReviews, ...baseReviews];

const Stars = ({ count }) => (
  <div className="flex gap-1">
    {[...Array(count)].map((_, i) => (
      <Star key={i} size={14} className="text-gold-400 fill-gold-400" />
    ))}
  </div>
);

const Testimonials = () => {
  const scrollRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const activeIndexRef = useRef(0);
  const [isPaused, setIsPaused] = useState(false);

  const scrollToIndex = (index) => {
    if (!scrollRef.current) return;
    const card = scrollRef.current.children[index];
    if (!card) return;

    scrollRef.current.scrollTo({ left: card.offsetLeft, behavior: 'smooth' });
    setActiveIndex(index);
  };

  const handleScroll = () => {
    if (!scrollRef.current) return;

    const container = scrollRef.current;
    const cardSpan = container.children[1]?.offsetLeft - container.children[0]?.offsetLeft;
    if (!cardSpan) return;

    const loopWidth = container.scrollWidth / 2;
    if (container.scrollLeft >= loopWidth) {
      container.scrollLeft -= loopWidth;
    }

    const closest = Math.round(container.scrollLeft / cardSpan) % baseReviews.length;
    if (closest !== activeIndexRef.current) {
      activeIndexRef.current = closest;
      setActiveIndex(closest);
    }
  };

  useEffect(() => {
    if (!scrollRef.current || isPaused) return undefined;

    let animationFrame;
    let lastTimestamp = 0;
    const speedPxPerSecond = 42;

    const animate = (timestamp) => {
      if (!scrollRef.current) return;
      if (!lastTimestamp) lastTimestamp = timestamp;
      const elapsed = (timestamp - lastTimestamp) / 1000;
      lastTimestamp = timestamp;

      const container = scrollRef.current;
      container.scrollLeft += speedPxPerSecond * elapsed;

      const loopWidth = container.scrollWidth / 2;
      if (container.scrollLeft >= loopWidth) {
        container.scrollLeft -= loopWidth;
      }

      const cardSpan = container.children[1]?.offsetLeft - container.children[0]?.offsetLeft;
      if (cardSpan) {
        const closest = Math.round(container.scrollLeft / cardSpan) % baseReviews.length;
        if (closest !== activeIndexRef.current) {
          activeIndexRef.current = closest;
          setActiveIndex(closest);
        }
      }

      animationFrame = requestAnimationFrame(animate);
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [isPaused]);

  return (
    <section className="section-padding bg-charcoal-800">
      <div className="container-custom">
        <div className="text-center mb-12">
          <p className="font-sans text-sm tracking-widest text-gold-400 uppercase mb-3">Client Love</p>
          <h2 className="font-serif text-4xl text-white">What They Say</h2>
          <div className="w-16 h-px bg-gold-400 mx-auto mt-4" />
        </div>

        <div className="relative">
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onTouchStart={() => setIsPaused(true)}
            onTouchEnd={() => setIsPaused(false)}
            className="hide-scrollbar flex overflow-x-auto gap-6 pb-2"
          >
            {reviews.map(({ name, role, rating, text }, index) => (
              <article
                key={`${name}-${index}`}
                className="shrink-0 w-[92%] sm:w-[72%] lg:w-[48%] bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors"
              >
                <Stars count={rating} />
                <p className="font-sans text-cream-200 text-sm leading-relaxed mt-4 mb-6 italic min-h-[88px]">
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
              </article>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-center gap-2 mt-6">
          {baseReviews.map((review, index) => (
            <button
              key={review.name}
              type="button"
              onClick={() => scrollToIndex(index)}
              aria-label={`Go to testimonial ${index + 1}`}
              className={`h-2.5 rounded-full transition-all ${
                activeIndex === index ? 'w-8 bg-gold-400' : 'w-2.5 bg-white/40 hover:bg-white/60'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;