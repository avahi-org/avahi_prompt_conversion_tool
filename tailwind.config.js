/** @type {import('tailwindcss').Config} */
const lineClamp = require('@tailwindcss/line-clamp');

module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      sansSerif: 'sans-serif',
      inter: 'Inter',
      poppins: 'Poppins',
    },
    extend: {
      screens: {
        '2xl': '1320px',
      },
      height: {
        14.5: '60px',
      },
      backgroundImage: {
        'hero-section': 'url(/images/HomeServiceImgMobile.webp)',
        'desktop-hero-section': 'url(/images/cityheroSectionBg.webp)',
      },
      colors: {
        primary: '#4E54FC',
        secondary: '#0c9a00',
        purple: {
          10: '#7432BB',
        },
        blue: {
          5: '#EFF4FE',
          10: '#EBF2FF',
          20: '#377FFF',
          30: '#D8E6FF',
          40: '#2E7CFE',
          50: '#005CFF',
        },
        gray: {
          10: '#E2E0E5',
          25: '#959595',
          50: '#F9FAFB',
          75: '#737373',
          100: '#616161',
          150: ' #A1A1A1',
          1000: '#fafafa',
        },
        redLight: {
          10: '#FFD7D7',
          20: '#F5095C',
        },
        greenLight: {
          10: '#D5F7D8',
          20: '#238B5B',
        },
        redError: {
          25: '#FF0000',
        },
        blackDark: {
          100: '#252525',
        },
        lightGray: {
          50: '#E5E7EB',
          100: '#757575',
          200: '#D1D5DB',
          300: '#424242',
        },
        lightGreen: {
          50: '#ddece2',
          100: '#f0f8f1',
          200: '#1DA52D',
        },
      },
      padding: {
        '40px': '40px',
      },
      boxShadow: {
        primaryBox: '0 6px 16px rgba(0, 0, 0, .24)',
        secondary: '0 6px 34px 0 rgba(186,184,203,.2)',
        card: '0 0 25px rgba(114, 114, 114, .08)',
        selection: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
      },
    },
  },
  plugins: [lineClamp],
};
