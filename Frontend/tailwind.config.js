/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      colors: {
        surface: {
          DEFAULT: "#f8fafc", // slate-50
          raised: "#ffffff",
          overlay: "#ffffff",
          card: "#ffffff",
        },
        border: {
          DEFAULT: "#e2e8f0", // slate-200
          hover: "#cbd5e1", // slate-300
        },
        text: {
          primary: "#0f172a", // slate-900
          secondary: "#475569", // slate-600
          muted: "#94a3b8", // slate-400
        },
        accent: {
          DEFAULT: "#2563eb", // blue-600
          hover: "#1d4ed8", // blue-700
          muted: "rgba(37, 99, 235, 0.1)",
        },
        success: "#16a34a", // green-600
        error: "#dc2626", // red-600
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-out both",
        "fade-in-up": "fadeInUp 0.6s ease-out both",
        "slide-in": "slideIn 0.4s ease-out both",
      },
      keyframes: {
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        fadeInUp: {
          from: { opacity: "0", transform: "translateY(16px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        slideIn: {
          from: { opacity: "0", transform: "translateX(-8px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
      },
    },
  },
  plugins: [],
};
