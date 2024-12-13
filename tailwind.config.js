/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.{html,js}"],
  theme: {
    extend: {
      maxWidth: {
        '100': '100%',
        '95': '95%',
        '90': '90%',
        '85': '85%',
      },
      fontFamily: {
        'sans': ['Oswald', 'sans-serif'],
      },
      colors:{
        bymehmet: '#303138',
        footerBg: '#222328'
      }
    },
  },
  plugins: [


  ],
}