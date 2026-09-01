/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // Or media, but class is often better for portfolios
  theme: {
    extend: {
      colors: {
        background: '#0a0a0a', // very dark off-black
        surface: '#171717',    // slightly lighter for cards
        surface2: '#262626',   // borders/hover states
        accent: {
          DEFAULT: '#0ea5e9',  // a vibrant, modern blue/cyan
          hover: '#0284c7',
        },
        text: {
          main: '#f3f4f6',     // off-white
          muted: '#9ca3af',    // gray
        }
      },
      fontFamily: {
        display: ['"Cabinet Grotesk"', 'Outfit', 'sans-serif'],
        body: ['Satoshi', '"DM Sans"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      keyframes:{
        'fade-in-down': {
          "from": {
            transform: "translateY(-0.75rem)",
            opacity: '0'
          },
          "to":{
            transform: "translateY(0rem)",
            opacity: '1'
          },
        },
      },
      animation: {
        'fade-in-down': "fade-in-down 0.3s ease-in-out both",
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
}
