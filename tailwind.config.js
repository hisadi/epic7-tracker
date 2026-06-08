/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['DM Sans', 'sans-serif'],
        mono: ['DM Mono', 'monospace'],
      },
      colors: {
        fire:  '#ef4444',
        ice:   '#38bdf8',
        earth: '#22c55e',
        light: '#fbbf24',
        dark:  '#a855f7',
      },
    },
  },
  plugins: [],
}
