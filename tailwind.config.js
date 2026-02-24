/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        'navy': '#1e3a5f',
        'cyan': '#00bcd4',
        'cyan-light': '#e0f7fa',
        'navy-light': '#e8eef5',
      },
    },
  },
  plugins: [],
}
