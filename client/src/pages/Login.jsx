import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Scissors, Eye, EyeOff } from 'lucide-react';
import { authService } from '@/services/authService';
import { useAuthStore } from '@/store/useAuthStore';
import Button from '@/components/common/Button';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setAuth } = useAuthStore();
  const from = location.state?.from?.pathname || '/';

  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await authService.login(form);
      const { token, ...user } = res.data.data;
      setAuth(user, token);
      navigate(user.role === 'admin' ? '/dashboard' : from, { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-cream-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-3">
            <div className="w-12 h-12 rounded-full bg-gold-500 flex items-center justify-center">
              <Scissors size={22} className="text-white" />
            </div>
          </div>
          <h1 className="font-serif text-3xl text-charcoal-800">Welcome Back</h1>
          <p className="font-sans text-sm text-charcoal-500 mt-2">Sign in to your Luxe Beauty account</p>
        </div>

        <div className="bg-white rounded-2xl border border-cream-200 shadow-card p-8">
          {error && (
            <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-100 text-sm text-red-600 font-sans">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-sans text-charcoal-600 mb-1">Email</label>
              <input
                type="email" required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="you@example.com"
                className="w-full px-4 py-3 rounded-xl border border-cream-200 font-sans text-charcoal-700 focus:outline-none focus:ring-2 focus:ring-gold-400"
              />
            </div>
            <div className="relative">
              <label className="block text-sm font-sans text-charcoal-600 mb-1">Password</label>
              {/* <input
                type="password" required
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-xl border border-cream-200 font-sans text-charcoal-700 focus:outline-none focus:ring-2 focus:ring-gold-400"
              /> */}
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                placeholder="••••••••"
                className="w-full px-4 py-3 pr-12 rounded-xl border border-cream-200 font-sans text-charcoal-700 focus:outline-none focus:ring-2 focus:ring-gold-400"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                className="absolute right-3 top-[38px] text-charcoal-500 hover:text-charcoal-700"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            <Button type="submit" loading={loading} className="w-full">
              Sign In
            </Button>
          </form>

          <p className="text-center text-sm font-sans text-charcoal-500 mt-6">
            Don't have an account?{' '}
            <Link to="/register" className="text-gold-500 hover:text-gold-600 font-medium">
              Sign up free
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;