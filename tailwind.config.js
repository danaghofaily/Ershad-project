/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        cover1: "url('/images/Cover1.png')",
        cover2: "url('/images/Cover2.png')",
        cover3: "url('/images/Cover3.png')",
        cover4: "url('/images/Cover4.png')",
        cover5: "url('/images/Cover5.png')",
        cover6: "url('/images/Cover6.png')",
        cover7: "url('/images/Cover7.png')",
      },
      colors: {
        baseBlack: "#0a0b0a",
        baseWhite: "#fafafa",
        primary: {
          DEFAULT: "#24584c",
          100: "#e1f3ee",
          800: "#307666",
        },
        secondary: {
          DEFAULT: "#AAB9C5",
          1000: "#323F49",
        },
        neutral: {
          100: "#e3e3e3",
          200: "#cccbcb",
          600: "#726c6c",
          700: "#5a5555",
          800: "#433f3e",
          900: "#2b2928",
        },
      },
      margin: {
        base: "16px",
        xxs: "2px",
        xs: "4px",
        s: "6px",
        sm: "10px",
        m: "14px",
        ml: "20px",
        l: "28px",
        xl: "40px",
      },
      padding: {
        base: "16px",
        xxs: "2px",
        xs: "4px",
        s: "6px",
        sm: "10px",
        m: "14px",
        ml: "20px",
        l: "28px,",
        xl: "40px",
      },
    },
  },
  plugins: [],
};
