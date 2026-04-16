const images = [
  { url: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600', span: 'col-span-2 row-span-2' },
  { url: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=600', span: '' },
  { url: 'https://unsplash.com/photos/a-woman-is-holding-a-plastic-bag-over-her-face-VlPuwEmMeA4?utm_source=unsplash&utm_medium=referral&utm_content=creditShareLink', span: '' },
  { url: 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=600', span: '' },
  { url: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600', span: '' },
];

const Lookbook = () => (
  <section id="gallery" className="section-padding bg-cream-50">
    <div className="container-custom">
      <div className="text-center mb-12">
        <p className="font-sans text-sm tracking-widest text-gold-500 uppercase mb-3">Portfolio</p>
        <h2 className="font-serif text-4xl text-charcoal-800">Our Lookbook</h2>
        <div className="w-16 h-px bg-gold-400 mx-auto mt-4" />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 auto-rows-[200px]">
        {images.map(({ url, span }, i) => (
          <div
            key={i}
            className={`${span} overflow-hidden rounded-2xl group cursor-pointer`}
          >
            <img
              src={url}
              alt={`Lookbook ${i + 1}`}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Lookbook;