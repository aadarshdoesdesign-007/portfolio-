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
        paper: '#E4E2D8',
        card: '#F9F3EB',
        notebook: {
          line: '#00AEEF',
          margin: '#FF31BC',
        },
        pop: {
          pink: '#FF4BB9',
          yellow: '#FFFF5F',
          cyan: '#00ADE6',
          blue: '#B3D3FF',
          green: '#90CD26',
          orange: '#FF6100',
        }
      },
      fontFamily: {
        pacaembu: ['Pacaembu', 'Plus Jakarta Sans', 'Outfit', 'sans-serif'],
        mooli: ['Mooli', 'Inter', 'sans-serif'],
        sans: ['Pacaembu', 'Plus Jakarta Sans', 'Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      }
    },
  },
  plugins: [],
};
