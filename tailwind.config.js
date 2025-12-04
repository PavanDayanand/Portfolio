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
    },
  },
  plugins: [],
}
