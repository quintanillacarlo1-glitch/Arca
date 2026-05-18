/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FF6B35',
        'primary-dark': '#E55A2B',
        secondary: '#004E89',
        accent: '#F7931E',
        dark: '#0A0E27',
        'dark-blue': '#1A1F3A',
      },
    },
  },
  plugins: [],
}
