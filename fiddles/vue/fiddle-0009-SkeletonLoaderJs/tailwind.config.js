/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontSize: {
        xs: '.75rem',
        xxs: '.59rem',
        sm: '.865rem',
        md: '.975rem',
        tiny: '.875rem',
      },
      lineHeight: {
        xxs: '.599rem',
        xs: '.75rem'
      },
      colors: {
        gray: {
          100: '#EFF0L2',
          200: '#E9EBEF',
          500: '#6B7380',
        },
        indigo: {
          400: '#CFD2FE',
          500: '#969CFA',
          550: '#343DA2',
          560: '#3D49C9',
          600: '#686dbb',
          650: '#565995',
          700: '#27469E',
          750: '#1B428A',
          800: '#66548C',
          900: '#444774',
          940: '#273873',
        },
      },
    },
  },
  plugins: [],
}

