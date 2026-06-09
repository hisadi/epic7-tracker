/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Cinzel Decorative"', 'serif'],
        body: ['"Crimson Pro"', 'serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        void:    '#0a0612',
        tome:    '#14101e',
        parchment: '#1f1830',
        gold: {
          100: '#f5e6a8',
          300: '#e8c876',
          500: '#c9a449',
          700: '#8a6d2c',
        },
        ruby: {
          400: '#c9364f',
          600: '#8b1e2d',
        },
        arcane: {
          400: '#8b5cf6',
          600: '#6b3fa0',
        },
        sapphire: {
          400: '#3a8fb7',
          600: '#1e5a7a',
        },
        verdant: {
          400: '#5fa15f',
          600: '#3a6b3a',
        },
        celestial: {
          400: '#f0e0a0',
          600: '#b8a85e',
        },
        shadow: {
          400: '#7c4f9c',
          600: '#4a2d5c',
        },
        crimson: {
          500: '#a82a3a',
          700: '#6b1a26',
        },
      },
      keyframes: {
        'shimmer': {
          '0%':  { backgroundPosition: '200% 0' },
          '100%': { backgroundPosition: '-200% 0' },
        },
        'glow-pulse': {
          '0%, 100%': { opacity: '0.6' },
          '50%':        { opacity: '1' },
        },
        'fade-in-up': {
          '0%':  { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'ember': {
          '0%, 100%': { boxShadow: '0 0 8px currentColor, 0 0 16px currentColor' },
          '50%':        { boxShadow: '0 0 12px currentColor, 0 0 24px currentColor' },
        },
      },
      animation: {
        shimmer:    'shimmer 3s linear infinite',
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
        'fade-in-up': 'fade-in-up 0.6s ease-out both',
        ember:       'ember 2.5s ease-in-out infinite',
      },
      backgroundImage: {
        'arcane-radial': 'radial-gradient(ellipse at center, #1f1830 0%, #0a0612 70%)',
        'gold-shine':    'linear-gradient(90deg, #8a6d2c 0%, #e8c876 50%, #8a6d2c 100%)',
      },
    },
  },
  plugins: [],
}
