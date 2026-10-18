export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: { sans: ['"Barlow Condensed"', 'sans-serif'] },
      colors: {
        hvac: { blue: '#0284c7', orange: '#f97316', neutral: '#64748b', accent: '#0f172a' },
        priority: { high: '#ef4444', medium: '#f59e0b', low: '#38bdf8', done: '#22c55e' }
      }
    }
  },
  plugins: []
}
