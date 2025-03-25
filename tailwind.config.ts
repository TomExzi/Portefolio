import type { Config } from "tailwindcss";

export default {
  darkMode: "class",
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Montserrat", "sans-serif"],
        display: ["Playfair Display", "serif"],
      },
      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
          sm: "2rem",
          lg: "4rem",
          xl: "5rem",
          "2xl": "6rem",
        },
      },
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
      colors: {
        "light-background":
          "rgb(var(--color-light-background) / <alpha-value>)",
        "light-surface": "rgb(var(--color-light-surface) / <alpha-value>)",
        "light-primary": "rgb(var(--color-light-primary) / <alpha-value>)",
        "light-secondary": "rgb(var(--color-light-secondary) / <alpha-value>)",
        "light-tertiary": "rgb(var(--color-light-tertiary) / <alpha-value>)",
        "dark-background": "rgb(var(--color-dark-background) / <alpha-value>)",
        "dark-surface": "rgb(var(--color-dark-surface) / <alpha-value>)",
        "dark-primary": "rgb(var(--color-dark-primary) / <alpha-value>)",
        "dark-secondary": "rgb(var(--color-dark-secondary) / <alpha-value>)",
        "dark-tertiary": "rgb(var(--color-dark-tertiary) / <alpha-value>)",
        primary: {
          50: "rgb(var(--color-primary-50) / <alpha-value>)",
          100: "rgb(var(--color-primary-100) / <alpha-value>)",
          200: "rgb(var(--color-primary-200) / <alpha-value>)",
          300: "rgb(var(--color-primary-300) / <alpha-value>)",
          400: "rgb(var(--color-primary-400) / <alpha-value>)",
          500: "rgb(var(--color-primary-500) / <alpha-value>)",
          600: "rgb(var(--color-primary-600) / <alpha-value>)",
          700: "rgb(var(--color-primary-700) / <alpha-value>)",
          800: "rgb(var(--color-primary-800) / <alpha-value>)",
          900: "rgb(var(--color-primary-900) / <alpha-value>)",
          950: "rgb(var(--color-primary-950) / <alpha-value>)",
        },
        gray: {
          50: "rgb(var(--color-gray-50) / <alpha-value>)",
          100: "rgb(var(--color-gray-100) / <alpha-value>)",
          200: "rgb(var(--color-gray-200) / <alpha-value>)",
          300: "rgb(var(--color-gray-300) / <alpha-value>)",
          400: "rgb(var(--color-gray-400) / <alpha-value>)",
          500: "rgb(var(--color-gray-500) / <alpha-value>)",
          600: "rgb(var(--color-gray-600) / <alpha-value>)",
          700: "rgb(var(--color-gray-700) / <alpha-value>)",
          800: "rgb(var(--color-gray-800) / <alpha-value>)",
          900: "rgb(var(--color-gray-900) / <alpha-value>)",
          950: "rgb(var(--color-gray-950) / <alpha-value>)",
        },
      },
      textColor: {
        light: {
          primary: "rgb(var(--color-light-primary) / <alpha-value>)",
          secondary: "rgb(var(--color-light-secondary) / <alpha-value>)",
        },
        dark: {
          primary: "rgb(var(--color-dark-primary) / <alpha-value>)",
          secondary: "rgb(var(--color-dark-secondary) / <alpha-value>)",
        },
      },
      backgroundColor: {
        card: {
          light: "rgb(var(--color-card-light) / <alpha-value>)",
          dark: "rgb(var(--color-card-dark) / <alpha-value>)",
        },
      },
      boxShadow: {
        "light-card": "var(--shadow-light-card)",
        "dark-card": "var(--shadow-dark-card)",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
} satisfies Config;
