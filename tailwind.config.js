/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        matrix: {
          bg: "#0A0D14",
          panel: "#0F1420",
          cyan: "#00F0FF",
          purple: "#7000FF",
          muted: "#8B93A7",
        },
      },
      fontFamily: {
        mono: ["'JetBrains Mono'", "ui-monospace", "monospace"],
      },
      boxShadow: {
        glow: "0 0 24px rgba(0,240,255,0.35)",
        "glow-lg": "0 0 48px rgba(112,0,255,0.45)",
      },
      animation: {
        "spin-slow": "spin 12s linear infinite",
        "pulse-glow": "pulse-glow 3s ease-in-out infinite",
      },
      keyframes: {
        "pulse-glow": {
          "0%,100%": { opacity: "0.6" },
          "50%": { opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};
