import { Scissors,  Phone, Mail, MapPin } from 'lucide-react';
import { FaInstagramSquare,FaFacebookSquare } from "react-icons/fa";

const Footer = () => (
  <footer className="bg-charcoal-800 text-cream-100 pt-16 pb-8">
    <div className="container-custom grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">

      <div>
        <div className="flex items-center gap-2 mb-4">
          <Scissors size={20} className="text-gold-400" />
          <span className="font-serif text-xl text-white">Luxe Beauty</span>
        </div>
        <p className="text-sm text-cream-300 leading-relaxed">
          Where luxury meets artistry. Your premier destination for beauty and wellness in the city.
        </p>
        <div className="flex gap-4 mt-6">
          <a href="#" className="p-2 rounded-full border border-cream-300/30 hover:border-gold-400 hover:text-gold-400 transition-colors">
            <FaInstagramSquare size={16} />
          </a>
          <a href="#" className="p-2 rounded-full border border-cream-300/30 hover:border-gold-400 hover:text-gold-400 transition-colors">
            <FaFacebookSquare size={16} />
          </a>
        </div>
      </div>

      <div>
        <h4 className="font-serif text-lg text-white mb-4">Opening Hours</h4>
        <div className="space-y-2 text-sm text-cream-300">
          <div className="flex justify-between"><span>Monday – Friday</span><span>9:00 AM – 7:00 PM</span></div>
          <div className="flex justify-between"><span>Saturday</span><span>9:00 AM – 6:00 PM</span></div>
          <div className="flex justify-between"><span>Sunday</span><span>10:00 AM – 4:00 PM</span></div>
        </div>
      </div>

      <div>
        <h4 className="font-serif text-lg text-white mb-4">Contact</h4>
        <div className="space-y-3 text-sm text-cream-300">
          <div className="flex items-center gap-3"><MapPin size={14} className="text-gold-400 shrink-0" /><span>123 Beauty Lane, New York, NY 10001</span></div>
          <div className="flex items-center gap-3"><Phone size={14} className="text-gold-400" /><span>+1 (555) 123-4567</span></div>
          <div className="flex items-center gap-3"><Mail size={14} className="text-gold-400" /><span>hello@luxebeauty.com</span></div>
        </div>
      </div>

    </div>
    <div className="border-t border-cream-300/10 pt-8 text-center text-xs text-cream-300/50 font-sans">
      © {new Date().getFullYear()} Luxe Beauty Salon. All rights reserved.
    </div>
  </footer>
);

export default Footer;