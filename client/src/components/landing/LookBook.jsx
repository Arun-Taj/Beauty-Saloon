const images = [
  {
    url: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800',
    title: 'Luxury Hair Styling',
    span: 'col-span-2 row-span-2',
  },
  {
    url: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=800',
    title: 'Bridal Makeup',
    span: '',
  },
  {
    url: 'https://i.pinimg.com/736x/70/81/0d/70810d8bb2b0105b471c2c93fce44502.jpg',
    title: 'Skin Glow Treatment',
    // span: '',
  },
  {
    url: 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=800',
    title: 'Hair Coloring',
    span: '',
  },
  {
    url: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800',
    title: 'Nail Art',
    span: '',
  },
];

const Lookbook = () => (
  <section
    id="gallery"
    className="py-24 bg-gradient-to-b from-cream-50 to-white"
  >
    <div className="container-custom">
      
      {/* Header */}
      <div className="text-center mb-14">
        <p className="text-sm tracking-[0.3em] text-gold-500 uppercase mb-3">
          Portfolio
        </p>
        <h2 className="font-serif text-4xl md:text-5xl text-charcoal-800">
          Our Lookbook
        </h2>
        <p className="text-charcoal-500 mt-4 max-w-xl mx-auto">
          Explore our signature beauty transformations crafted with precision and elegance.
        </p>
        <div className="w-20 h-[2px] bg-gold-400 mx-auto mt-5" />
      </div>

      {/* Gallery */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 auto-rows-[220px]">
        {images.map(({ url, span, title }, i) => (
          <div
            key={i}
            className={`${span} relative overflow-hidden rounded-3xl group cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-1`}
          >
            <img
              src={url}
              alt={title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition duration-500" />

            {/* Title */}
            <div className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition duration-500">
              <p className="font-serif text-lg">{title}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Lookbook;