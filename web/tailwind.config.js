/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}', // Note the addition of the `app` directory.
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
 
    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {},
    screens: {
      'sm': '640px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1200px',
      // => @media (min-width: 1200px) { ... }

      '2xl': '1400px',
      // => @media (min-width: 1400px) { ... }
      
      '3xl': '1600px',
      // => @media (min-width: 1600px) { ... }
    },
    container: {
      center: true,
      margin: {
        DEFAULT: '15px',
      },
      padding: {
        DEFAULT: '15px',
        md: '30px',
        lg: '40px',
      },
      screens: {
        xl: '1200px',
        '2xl': '1400px',
        '3xl': '1600px',
      },
    }
  },
  plugins: [],
}