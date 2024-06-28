/** @type {import('tailwindcss').Config} */
const lineClamp = require('@tailwindcss/line-clamp');

module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      sansSerif: 'sans-serif',
      inter: 'Inter',
    },

    extend: {
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
        gray: {
          25: '#959595',
          50: '#F9FAFB',
          100: '#616161',
          1000: '#fafafa',
        },
        redError: {
          25: '#FF0000',
        },
        blackDark: {
          100: '#212121',
          200: '#333333',
          300: '#111827',
          400: '#4B5563',
          500: '#6B7280',
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
