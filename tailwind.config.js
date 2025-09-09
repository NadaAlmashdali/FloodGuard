// tailwind.config.js
export default {
  darkMode: 'class',   // ← مهم: تفعيل وضع الداكن عبر class على الجذر
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: { extend: {} },
  plugins: [],
}
