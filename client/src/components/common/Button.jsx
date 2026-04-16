import { cn } from '@/utils/cn';

const variants = {
  primary:  'bg-gold-500 hover:bg-gold-600 text-white shadow-luxury',
  outline:  'border border-gold-500 text-gold-600 hover:bg-gold-50',
  ghost:    'text-charcoal-600 hover:bg-cream-100',
  danger:   'bg-red-500 hover:bg-red-600 text-white',
};

const sizes = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
};

const Button = ({
  children, variant = 'primary', size = 'md',
  className, loading, disabled, ...props
}) => (
  <button
    disabled={disabled || loading}
    className={cn(
      'inline-flex items-center justify-center gap-2 rounded-full font-sans font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed',
      variants[variant],
      sizes[size],
      className
    )}
    {...props}
  >
    {loading && (
      <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
      </svg>
    )}
    {children}
  </button>
);

export default Button;