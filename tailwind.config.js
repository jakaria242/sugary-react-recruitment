/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      maxWidth: {
        container: '1200px',
      },
      screens: {
        xs: "400px",
        sm: "576px",
        md: "768px",
        lg: "992px",
        xl: "1220px",
        "2xl": "1400px",
        },
    },
  },
  plugins: [],
}

