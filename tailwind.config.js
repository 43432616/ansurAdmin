/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    fontFamily: {
      sans: ["Open Sans", "sans-serif"],
      serif: ['SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace', "serif"],
      body: ["Roboto", "sans-serif"],
      awesome: ["FontAwesome"],
      "awesome-5-free": ["Font Awesome\\ 5 Free"],
        },
  },
  plugins: [],
}