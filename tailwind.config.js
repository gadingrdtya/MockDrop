/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: '#0A0A0A',
        surface: {
          1: '#171717',
          2: '#262626',
        },
        border: '#262626',
        text: {
          primary: '#FFFFFF',
          secondary: '#A3A3A3',
        },
        brand: {
          DEFAULT: '#FFFFFF',
          secondary: '#A3A3A3',
        },
        success: '#10B981',
      },
      fontFamily: {
        sans: ['Inter', 'SF Pro Display', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        mono: ['JetBrains Mono', 'Geist Mono', 'monospace'],
      },
      boxShadow: {
        none: 'none',
      },
    },
  },
  plugins: [],
}
