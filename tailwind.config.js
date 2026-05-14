/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './*.{ts,tsx}'
  ],
  theme: {
    container: {
      center: true,
      padding: '1rem'
    },
    extend: {
      colors: {
        background: 'hsl(222.2 84% 4.9%)',
        foreground: 'hsl(210 40% 98%)',
        primary: {
          DEFAULT: '#3b82f6',
          foreground: '#ffffff'
        },
        muted: {
          DEFAULT: 'hsl(210 40% 16%)',
          foreground: 'hsl(215.4 16.3% 56.9%)'
        },
        border: 'hsl(215 20.2% 25.1%)',
        accent: 'hsl(217 33% 17%)'
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui']
      }
    }
  },
  plugins: []
};
