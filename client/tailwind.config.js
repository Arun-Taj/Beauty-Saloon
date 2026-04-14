/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // ── Luxury Beauty Palette ──────────────────────────────
        cream: {
          50:  '#FDFAF5',   // page backgrounds
          100: '#F8F2E6',   // card surfaces
          200: '#F0E4CC',   // subtle borders
          300: '#E2CDA8',   // dividers
        },
        gold: {
          300: '#E8C97A',   // soft accent
          400: '#D4A843',   // primary CTA hover
          500: '#BF8F1E',   // primary CTA default
          600: '#9A7015',   // dark accent
          700: '#75520D',   // deep gold text
        },
        charcoal: {
          600: '#4A4A4A',   // body text
          700: '#333333',   // headings
          800: '#1F1F1F',   // hero text
          900: '#0D0D0D',   // max contrast
        },
        rose: {
          100: '#FCEEF0',   // badge bg
          300: '#F0B8C0',   // soft pink accent
          500: '#D4687A',   // active states
        },
         // ── Semantic aliases ───────────────────────────────────
        primary:   '#BF8F1E',   // gold-500
        secondary: '#F8F2E6',   // cream-100
        surface:   '#FDFAF5',   // cream-50
        text:      '#333333',   // charcoal-700
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],  // display/headings
        sans:  ['"DM Sans"', 'system-ui', 'sans-serif'],      // body
        accent:['"Playfair Display"', 'serif'],                // hero taglines
      },
      backgroundImage: {
        'gold-shimmer': 'linear-gradient(135deg, #D4A843 0%, #BF8F1E 50%, #E8C97A 100%)',
      },
      boxShadow: {
        'luxury': '0 4px 24px rgba(191,143,30,0.12)',
        'card':   '0 2px 12px rgba(0,0,0,0.06)',
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
      },
    },
  },
  plugins: [],
}