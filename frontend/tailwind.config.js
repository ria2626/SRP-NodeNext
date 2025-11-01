/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/**/*.{js,ts,jsx,tsx}", // ✅ Watch all TSX files in src/
    ],
    theme: {
      extend: {
        colors: {
          gold: "#D4AF37", // ✅ Now you can use bg-gold
        },
      },
    },
    plugins: [],
  }
  