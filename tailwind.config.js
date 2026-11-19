/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: { extend: { colors: { forest: '#173f32', sandstone: '#f5f2eb', terracotta: '#bb674a' }, fontFamily: { sans: ['DM Sans', 'sans-serif'], display: ['Manrope', 'sans-serif'] } } },
  plugins: [],
}
