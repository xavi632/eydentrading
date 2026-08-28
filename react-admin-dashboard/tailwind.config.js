/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#f0f7ff",
          100: "#e0f0ff",
          500: "#0066cc",
          600: "#0052a3",
          700: "#003d7a",
        },
        slate: {
          900: "#1a2332",
          700: "#6b7684",
          100: "#f8f9fa",
        },
      },
      fontSize: {
        xs: "0.75rem",
        sm: "0.875rem",
        base: "1rem",
        lg: "1.125rem",
        xl: "1.25rem",
        "2xl": "1.5rem",
        "3xl": "1.875rem",
      },
    },
  },
  plugins: [],
}
