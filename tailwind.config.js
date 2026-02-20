/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'surgical-black': '#0a0a0a',
        'neon-blue': '#00f3ff',
      }
    },
  },
  plugins: [],
}
