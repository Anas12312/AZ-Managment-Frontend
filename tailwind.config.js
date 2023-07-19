
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
        //Zyad Blue
        // 'primary-1': '#164B60',
        // 'primary-2': '#164B60',
        // 'accent': '#0E2954',
        // 'accent-2': '#1B6B93',
        //Anas Pink
        'primary-1': '#1D267D',
        'primary-2': '#5C469C',
        'accent': '#0C134F',
        'accent-2': '#1D267D',

        'primary-gray': '#c5bfc9',
        'secondary-2': '#ffffff',
        'secondary-3': '#DDE6ED',
        'yellow-1': '#FFF2AB',
        'yellow-2': '#FFF7D1',
        'yellow-3': '#FFE66E',
        'pink-1': '#FFCCE5',
        'pink-2': '#FFE4F1',
        'pink-3': '#FFAFDF',
        'blue-1': '#CDE9FF',
        'blue-2': '#E2F1FF',
        'blue-3': '#9EDFFF',
        'green-1': '#CBF1C4',
        'green-2': '#E4F9E0',
        'green-3': '#A1EF9B',
        'purple-1': '#E7CFFF',
        'purple-2': '#F2E6FF',
        'purple-3': '#D7AFFF',
        'gray-1': '#E1DFDD',
        'gray-2': '#F3F2F1',
        'gray-3': '#E0E0E0',
        'black-1': '#494745',
        'black-2': '#696969',
        'black-3': '#767676',
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

