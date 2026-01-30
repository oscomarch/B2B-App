import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "Inter",
          "SF Pro Display",
          "-apple-system",
          "system-ui",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
      },
      colors: {
        cream: {
          DEFAULT: "#FDFAF7",
          dark: "#F5F1ED",
        },
        coral: {
          DEFAULT: "#FF8A73",
          dark: "#FF6B5B",
          light: "rgba(255, 138, 115, 0.15)",
        },
        "pink-soft": "#FF6B9D",
        "blue-soft": {
          DEFAULT: "#7B9CFF",
          light: "rgba(123, 156, 255, 0.15)",
        },
        "green-soft": {
          DEFAULT: "#4ECDC4",
          light: "rgba(78, 205, 196, 0.15)",
        },
        "purple-soft": "#A78BFA",
      },
      borderRadius: {
        "xl": "16px",
        "2xl": "20px",
        "3xl": "24px",
      },
      boxShadow: {
        "soft": "0 2px 20px rgba(0, 0, 0, 0.04)",
        "card": "0 4px 32px rgba(0, 0, 0, 0.06)",
        "elevated": "0 8px 40px rgba(0, 0, 0, 0.08)",
      },
      spacing: {
        "18": "4.5rem",
        "22": "5.5rem",
        "30": "7.5rem",
      },
      animation: {
        "float": "float 6s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
    },
  },
  plugins: [],
}
export default config
