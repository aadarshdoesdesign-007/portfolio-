/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        survey: {
          dark: '#111312',
          surface: '#1A1D1B',
          panel: '#252725',
          border: '#333734',
          muted: '#686A64',
          parchment: '#E7E1D3',
          offwhite: '#F4F2EC',
          blue: '#42677B',
          deepblue: '#1F3948',
          orange: '#E66A2C',
          yellow: '#D7C94B',
        }
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
        serif: ['var(--font-serif)', 'serif'],
      }
    },
  },
  plugins: [],
};