module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      height: theme => ({
        "screen-1": "10vh",
        "screen-2": "20vh",
        "screen-3": "30vh",
        "screen-4": "40vh",
        "screen-5": "50vh",
        "screen-6": "60vh",
        "screen-7": "70vh",
        "screen-8": "80vh",
        "screen-9": "90vh",
      }),
      gridTemplateColumns: {
        'lg-2cols': '50% 50%',
        'lg-3cols': '33.333333% 33.333333% 33.333333%',
        'lg-4cols': '25% 25% 25% 25%',
        'lg-5cols': '20% 20% 20% 20% 20%',
      },
      gridTemplateRows: {
        'lg-2rows': '80% 20%',
        'lg-3rows': '80% 10% 10%',
        'lg-4rows': '10% 70% 10% 10%',
        'lg-7rows': '10% 30% 20% 10% 10% 10% 10%',
        'md-3rows': '120px 170px 40px',
        'sm-3rows': '120px 170px 40px',
      },
      zIndex: {
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
        '100': '100',
        '110': '110',
        '120': '120',
        '130': '130',
        '140': '140',
        '150': '150',
        '-10': '-10',
        '-20': '-20',
        '-30': '-30',
        '-40': '-40',
        '-50': '-50',
        '-60': '-60',
        '-70': '-70',
        '-80': '-80',
        '-90': '-90',
        '-100': '-100',
      },
      lineClamp: {
        7: '7',
        8: '8',
        9: '9',
        10: '10',
      },
      boxShadow: {
        blue: '0 2px 10px 0 rgba(59, 130, 246, .4)',
        red: '0 2px 10px 0 rgba(248, 113, 113, .4)',
        inner_blue: 'inset 0 2px 6px 0 rgba(59, 130, 246, 0.4)'
      },
    },
    screens: {
      'xs': '480px',
      // => @media (min-width: 640px) { ... }
      
      'sm': '640px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    }
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
  important: true,
}
