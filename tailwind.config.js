/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        whiteRgb: "rgba(240, 217, 234, 0.98)",
        secondary: "#FFF0D9",
        primary: "#1a202c", // define your primary color here
        secondary: "#d6dae1",
        tertiary: "#d1d1d1",
        brandone: "#824CF2",
        brandtwo: "#FF6ABB",
      },
      backgroundColor: {
        primary: "#f5f5f5", // define your primary background color here
      },
      screens: {
        sm: '480px',
        smm: '668px',
        md: '768px',
        mdd: '896px',
        lg: '976px',
        lgg: '1160px',
        lggg: '1230px',
        xl: '1440px',
        xxl: '1920px',
      },

    }
  },
  plugins: [
    require('tailwind-scrollbar'),
    // install tailwind forms
    //     npm cache clean --force
    // rm -rf .next/cache
    // npm install -D @tailwindcss/form
    // require('@tailwindcss/forms'),
  ],
}

