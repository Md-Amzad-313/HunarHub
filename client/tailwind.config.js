/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // HunarHub brand palette – can be updated in Phase 1
        primary: {
          50:  '#fef3e2',
          100: '#fde3b9',
          200: '#fbd08b',
          300: '#f9bd5d',
          400: '#f8af3e',
          500: '#f7a020',  // main brand orange
          600: '#e68f18',
          700: '#c97710',
          800: '#ac610a',
          900: '#8c4e06',
        },
        secondary: {
          50:  '#e6f0fb',
          100: '#c1d8f6',
          200: '#98bef0',
          300: '#70a4ea',
          400: '#5290e5',
          500: '#347de0',  // accent blue
          600: '#2e6fca',
          700: '#265daa',
          800: '#1e4c8a',
          900: '#133969',
        },
        neutral: {
          50:  '#f8f9fa',
          100: '#f1f3f5',
          200: '#e9ecef',
          300: '#dee2e6',
          400: '#ced4da',
          500: '#adb5bd',
          600: '#6c757d',
          700: '#495057',
          800: '#343a40',
          900: '#212529',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        heading: ['Poppins', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        xl: '1rem',
        '2xl': '1.5rem',
      },
      boxShadow: {
        card: '0 2px 12px rgba(0, 0, 0, 0.08)',
        'card-hover': '0 6px 24px rgba(0, 0, 0, 0.14)',
      },
    },
  },
  plugins: [],
};
