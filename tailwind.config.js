/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'text': '#f9f1fe',
        'background': '#1c0826',
        'primary-1': '#513069',
        'primary-2': '#412357',
        'secondary-2': '#ffffff',
        'accent': '#0d0321',
        }
      }
    },
  plugins: [],
}

