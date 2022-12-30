// eslint-disable-next-line @typescript-eslint/no-var-requires
const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx}',
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    fontFamily: {
      serif: ['PT Serif', ...defaultTheme.fontFamily.serif],
      sans: ['Nunito Sans', ...defaultTheme.fontFamily.sans],
    },
    extend: {
      colors: {
        'main-100': 'var(--color-main-100)',
        'main-200': 'var(--color-main-200)',
        'main-300': 'var(--color-main-300)',
        'main-400': 'var(--color-main-400)',
        'main-500': 'var(--color-main-500)',
        'main-600': 'var(--color-main-600)',
        'main-700': 'var(--color-main-700)',
        'main-800': 'var(--color-main-800)',
        'main-900': 'var(--color-main-900)',
      },
      animation: {
        'slow-fade-in': 'fadeIn 750ms linear',
      },
      keyframes: {
        fadeIn: {
          from: { opacity: '0' },
          to: { transform: '100' },
        },
      },
    },
  },
  variants: {},
  plugins: [],
};
