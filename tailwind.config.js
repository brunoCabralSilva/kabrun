// tailwind.config.js
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      backgroundImage: {
        'background': "url('/src/assets/dragon.png')",
      },
      colors: {
        'gray-whats': '#202C33',
        'green-whats': '#005C4B',
        'green-whats-dark': '#013027',
        'gray-whats-dark': '#0c1114',
      },
      spacing: {
        '5vh': '5vh',
        '6vh': '6vh',
        '10vh': '10vh',
        '15vh': '15vh',
        '20vh': '20vh',
        '30vh': '30vh',
        '35vh': '35vh',
        '40vh': '40vh',
        '50vh': '50vh',
        '55vh': '55vh',
        '60vh': '60vh',
        '65vh': '65vh',
        '70vh': '70vh',
        '75vh': '75vh',
        '80vh': '80vh',
        '82vh': '82vh',
        '85vh': '85vh',
        '90vh': '90vh',
      },
      gridTemplateColumns: {
        '30': 'repeat(30, minmax(0, 1fr))',
      }
    },
  },
  plugins: [],
}
