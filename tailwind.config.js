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

        // ── 3D / animated enhancements ──
        'float': {
          '0%, 100%': { transform: 'translateY(0px) rotateX(0)' },
          '50%':        { transform: 'translateY(-6px) rotateX(2deg)' },
        },
        'float-slow': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':        { transform: 'translateY(-10px)' },
        },
        'border-rotate': {
          '0%':   { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        'shimmer-border': {
          '0%':   { backgroundPosition: '0% 50%' },
          '100%': { backgroundPosition: '200% 50%' },
        },
        'parallax-pulse': {
          '0%, 100%': { transform: 'scale(1)',     opacity: '0.5' },
          '50%':        { transform: 'scale(1.15)', opacity: '0.8' },
        },
        'lift': {
          '0%, 100%': { transform: 'translateY(0) translateZ(0)' },
          '50%':        { transform: 'translateY(-3px) translateZ(20px)' },
        },
        'orbit': {
          '0%':   { transform: 'rotate(0deg) translateX(8px) rotate(0deg)' },
          '100%': { transform: 'rotate(360deg) translateX(8px) rotate(-360deg)' },
        },
        'spark': {
          '0%, 100%': { opacity: '0',  transform: 'translateY(0) scale(0.5)' },
          '50%':        { opacity: '1',  transform: 'translateY(-12px) scale(1)' },
        },
      },
      animation: {
        shimmer:    'shimmer 3s linear infinite',
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
        'fade-in-up': 'fade-in-up 0.6s ease-out both',
        ember:       'ember 2.5s ease-in-out infinite',

        // 3D
        float:         'float 5s ease-in-out infinite',
        'float-slow':  'float-slow 7s ease-in-out infinite',
        'border-rotate': 'border-rotate 4s linear infinite',
        'shimmer-border': 'shimmer-border 3s linear infinite',
        'parallax-pulse': 'parallax-pulse 6s ease-in-out infinite',
        lift:          'lift 4s ease-in-out infinite',
        orbit:         'orbit 8s linear infinite',
        spark:         'spark 1.5s ease-in-out infinite',
      },
      perspective: {
        '500':  '500px',
        '1000': '1000px',
        '1500': '1500px',
      },
      backgroundImage: {
        'arcane-radial': 'radial-gradient(ellipse at center, #1f1830 0%, #0a0612 70%)',
        'gold-shine':    'linear-gradient(90deg, #8a6d2c 0%, #e8c876 50%, #8a6d2c 100%)',
        'arcane-shine':  'linear-gradient(90deg, #4a2d5c 0%, #8b5cf6 50%, #4a2d5c 100%)',
      },
      boxShadow: {
        'relic':         '0 8px 32px -4px rgba(201, 164, 73, 0.25), 0 4px 12px -2px rgba(0, 0, 0, 0.6)',
        'relic-hover':   '0 16px 48px -4px rgba(201, 164, 73, 0.4),  0 8px 24px -2px rgba(139, 92, 246, 0.3)',
        'arcane':        '0 0 24px rgba(139, 92, 246, 0.4)',
        'ember-deep':    '0 0 32px rgba(201, 164, 73, 0.6)',
      },
    },
  },
  plugins: [],
}
