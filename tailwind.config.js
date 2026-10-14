/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx}', './components/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Warm off-white page background.
        paper: '#f7f5ef',
        // Brand green, matched to the green of the CPC logo mark.
        brand: {
          50: '#eef7ea',
          100: '#dcefd3',
          300: '#bfe6b0',
          600: '#1f7a2e',
          700: '#17611f',
          800: '#0f4a17',
          900: '#0a3510',
          950: '#052008',
        },
        // Near-black with a green cast, used for text and dark sections.
        ink: {
          950: '#0d1410',
        },
      },
      fontFamily: {
        sans: ['var(--font-body)', 'Helvetica Neue', 'Arial', 'sans-serif'],
        display: ['var(--font-display)', 'Impact', 'Arial Narrow Bold', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
