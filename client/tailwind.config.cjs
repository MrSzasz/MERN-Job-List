/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "main": "#162446",
        "success": "#22c55e",
        "rejected": "#ef4444",
        "processing": "#eab308",
        "applied": "#3b82f6",
        "later": "#6b7280",
      },
    },
  },
  plugins: [],
}