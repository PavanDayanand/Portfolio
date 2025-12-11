/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: '#0033FF',
          dark: '#111111',
          gray: '#F5F5F7',
        },
        neon: {
          blue: '#2E86FF',
          purple: '#B620E0',
          cyan: '#00FFF0',
        },
        skin: {
          base: 'rgb(var(--color-bg-base) / <alpha-value>)',
          inverted: 'rgb(var(--color-bg-inverted) / <alpha-value>)',
          accent: 'rgb(var(--color-bg-accent) / <alpha-value>)',
          card: 'rgb(var(--color-bg-card) / <alpha-value>)',
          'text-base': 'rgb(var(--color-text-base) / <alpha-value>)',
          'text-inverted': 'rgb(var(--color-text-inverted) / <alpha-value>)',
          'text-accent': 'rgb(var(--color-text-accent) / <alpha-value>)',
          'border-base': 'rgb(var(--color-border-base) / <alpha-value>)',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
      },
      backgroundImage: {
        'glass-gradient': 'linear-gradient(145deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.01) 100%)',
      },
      backdropBlur: {
        xs: '2px',
      }
    },
  },
  plugins: [],
}
