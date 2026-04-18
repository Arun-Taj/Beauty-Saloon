const items = ['Hair Styling','Balayage','Skincare','Nail Art','Bridal Makeup','Wellness','Keratin','HydraFacial'];

const MarqueeStrip = () => (
  <div className="bg-gold py-3.5 overflow-hidden">
    <div className="flex animate-marquee whitespace-nowrap">
      {[...items, ...items].map((item, i) => (
        <span key={i} className="inline-flex items-center gap-5 mx-6 font-label text-[10px] tracking-[0.3em] uppercase text-ink">
          {item}
          <span className="w-1 h-1 rounded-full bg-ink/40 inline-block" />
        </span>
      ))}
    </div>
  </div>
);

export default MarqueeStrip;