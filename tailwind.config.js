/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: { // here it will override the default data
    fontFamily: {
      sans: "Roboto Mono, monospace", // this will be applied to all pages monospace will work if Roboto Mono did not
    },
    extend: {
      height: {
        screen: "100dvh",
      },
      //colors: {}, // I can add colors of my own
    },
  },
  plugins: [],
}

