/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2563eb',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
}

