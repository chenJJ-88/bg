/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontSize: {
      root: '16px',//修改rem的计算值
    },
    extend: {},
  },
  plugins: [],
}