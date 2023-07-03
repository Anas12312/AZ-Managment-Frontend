
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
        'primary-gray': '#c5bfc9',
        'secondary-2': '#ffffff',
        'secondary-3': '#efedf0',
        'accent': '#0d0321',
        'accent-2': '#1d0a42'
      },
      fontFamily: {
        openSans: ['Open+Sans'],
      },
      animation: {
        bounce200: 'bounce 1s infinite 200ms',
        bounce400: 'bounce 1s infinite 400ms',
      },
      }
    },
  plugins: [],
}

