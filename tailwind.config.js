/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    ,
  ],
  theme: {
    extend: {
      animation: {
        fall: "fall linear infinite",
      },
      keyframes: {
        fall: {
          "0%": { transform: "translateY(0)", opacity: "0" },
          "50%": { opacity: "0.5" },
          "100%": { transform: "translateY(100vh)", opacity: "0" },
        },
      },
    },
  },
  plugins: [],
}

