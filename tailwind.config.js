/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors:{
        primary: "#2E073F",
        secondary: "#7A1CAC",
        complementary: "#AD49E1",
        dark_complementary: "#7A1CAC",
        contrastPrimary: "#EBD3F8 ",
        textColor: "#2E073F",
      }
    },
  },
  plugins: [],
}

