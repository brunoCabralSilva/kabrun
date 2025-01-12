// tailwind.config.js
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      zIndex: {
        '60': '60',
        '70': '70',
      },
      backgroundImage: {
        'background': "url('/src/assets/wallpaper.jpg')",
        'rule': "url('/src/assets/page.png')",
        'barra': "url('/src/assets/dnd-barra.png')",
        'rule-1': "url('/src/assets/rules.png')"
      },
      colors: {
        'gray-whats': '#202C33',
        'green-whats': '#005C4B',
        'green-whats-dark': '#013027',
        'gray-whats-dark': '#0c1114',
        'dnd-red': '#FC0A09',
        "dnd-dark-yellow": "#2E1D06",
        "dnd-yellow": "#C8B15F",
        "dnd-yellow-light": "#d6c894",
        "dnd-blue-dark": "#080e14",
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
        '95vh': '95vh',
        '97vh': '97vh',
        '98vh': '98vh',
      },
      gridTemplateColumns: {
        '30': 'repeat(30, minmax(0, 1fr))',
        '20': 'repeat(20, minmax(0, 1fr))',
        '10': 'repeat(10, minmax(0, 1fr))',
      }
    },
  },
  plugins: [],
}
