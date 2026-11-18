/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
      },
      colors: {
        neu: {
          bg: '#E6ECF5',
          light: '#FFFFFF',
          dark: '#C2CFE0',
          accent: '#2554EE',
          accentLight: '#4B7BFF',
          textDark: '#2D3748',
          textMuted: '#7A889B',
        },
        primary: '#DCE8F5',
        secondary: '#457B9D',
        hoverSecondary: '#589cc7'
      },
      boxShadow: {
        'neu-flat': '8px 8px 18px #c2cfe0, -8px -8px 18px #ffffff',
        'neu-flat-lg': '12px 12px 26px #bfccde, -12px -12px 26px #ffffff',
        'neu-flat-sm': '4px 4px 10px #c5d1e2, -4px -4px 10px #ffffff',
        'neu-pressed': 'inset 4px 4px 8px #c2cfe0, inset -4px -4px 8px #ffffff',
        'neu-pressed-sm': 'inset 2px 2px 5px #c2cfe0, inset -2px -2px 5px #ffffff',
        'neu-blue': '0 8px 20px -3px rgba(37, 84, 238, 0.45), inset 0 1px 1px rgba(255, 255, 255, 0.35)',
        'neu-badge': '3px 3px 8px #c2cfe0, -3px -3px 8px #ffffff',
      }
    },
  },
  plugins: [],
}