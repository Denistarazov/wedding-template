import type { Config } from 'tailwindcss';

const config: Config = {
  // Enable dark mode via a CSS class (controlled by next-themes)
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // Custom wedding color palette — change these to match your theme
      colors: {
        blush: {
          50:  '#fdf4f4',
          100: '#fce8e8',
          200: '#f8d0d0',
          300: '#f2a8a8',
          400: '#e97878',
          500: '#dd5050',
          600: '#c93232',
          700: '#a82626',
          800: '#8b2222',
          900: '#731e1e',
        },
        champagne: {
          50:  '#fefaf2',
          100: '#fdf3de',
          200: '#fbe4ba',
          300: '#f8ce8d',
          400: '#f4b05e',
          500: '#f09535',
          600: '#e07820',
          700: '#ba5e1a',
          800: '#954a1b',
          900: '#7a3d1a',
        },
        gold: {
          50:  '#fdfcf0',
          100: '#faf7d6',
          200: '#f4ecac',
          300: '#ebdc78',
          400: '#e0c94a',
          500: '#d4b427',
          600: '#b8921c',
          700: '#956f18',
          800: '#7a5619',
          900: '#66461a',
          DEFAULT: '#C9A87C',
        },
        cream: '#FDF8F0',
        ivory: '#FFFFF0',
      },
      // Custom fonts — loaded via next/font in layout.tsx
      fontFamily: {
        serif: ['var(--font-playfair)', 'Georgia', 'Cambria', 'serif'],
        sans:  ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      // Custom keyframe animations
      keyframes: {
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%':   { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%':      { transform: 'translateY(-8px)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
      },
      animation: {
        'fade-in':  'fadeIn 0.8s ease-in-out both',
        'slide-up': 'slideUp 0.7s ease-out both',
        'float':    'float 4s ease-in-out infinite',
        'shimmer':  'shimmer 2s linear infinite',
      },
    },
  },
  plugins: [],
};

export default config;
