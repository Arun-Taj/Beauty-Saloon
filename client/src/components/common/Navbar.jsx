import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, Scissors } from 'lucide-react';
import { useAuthStore } from '@/store/useAuthStore';
import Button from './Button';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuthStore();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navLinks = [
    { label: 'Home',     to: '/' },
    { label: 'Services', to: '/#services' },
    { label: 'Gallery',  to: '/#gallery' },
    { label: 'Book Now', to: '/booking' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-b border-cream-200 shadow-sm">
      <div className="container-custom flex items-center justify-between h-16">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <Scissors size={22} className="text-gold-500" />
          <span className="font-serif text-xl text-charcoal-800 tracking-wide">
            Soniya Beauty Saloon
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map(({ label, to }) => (
            <a
              key={label}
              href={to}
              className={`text-sm font-sans transition-colors hover:text-gold-500 ${
                pathname === to ? 'text-gold-500' : 'text-charcoal-600'
              }`}>   
              {label}
            </a>
          ))}
        </div>

        {/* Auth buttons */}
        <div className="hidden md:flex items-center gap-3">
          {isAuthenticated ? (
            <>
              {user?.role === 'admin' && (
                <Link to="/dashboard">
                  <Button variant="outline" size="sm">Dashboard</Button>
                </Link>
              )}
              <span className="text-sm text-charcoal-600 font-sans">
                Hi, {user?.name?.split(' ')[0]}
              </span>
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button variant="ghost" size="sm">Login</Button>
              </Link>
              <Link to="/register">
                <Button size="sm">Sign Up</Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-cream-200 px-4 py-4 flex flex-col gap-4">
          {navLinks.map(({ label, to }) => (
            <a
              key={label}
              href={to}
              className="text-charcoal-700 font-sans text-sm"
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </a>
          ))}
          <hr className="border-cream-200" />
          {isAuthenticated ? (
            <>
              {user?.role === 'admin' && (
                <Link to="/dashboard" onClick={() => setMenuOpen(false)}>
                  <Button variant="outline" size="sm" className="w-full">Dashboard</Button>
                </Link>
              )}
              <Button variant="ghost" size="sm" onClick={handleLogout}>Logout</Button>
            </>
          ) : (
            <>
              <Link to="/login"    onClick={() => setMenuOpen(false)}><Button variant="outline" size="sm" className="w-full">Login</Button></Link>
              <Link to="/register" onClick={() => setMenuOpen(false)}><Button size="sm" className="w-full">Sign Up</Button></Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;