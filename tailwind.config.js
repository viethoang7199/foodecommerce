/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'],
        lobster: ['Lobster Two', 'cursive']
      },
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1281px",
        "2xl": "1536px",
      },
      colors: {
        'white': '#fff',
        'black': '#000',
        'pink': '#ea0d42',
        'dark-pink': '#870f2b',
        'cream': '#fbe5cb',
        'orange': '#FF9D2D',
        'light-green': '#a7f3d0',
        'dark-blue': '#010f1c',
        'light-gray': '#F0F1F2',
        'dark-gray': '#cbcbcb',
        'background': '#faf7f2',
        'bg-rgba': 'rgba(0,0,0,0.5)'
      },
    },
    keyframes: {
      wiggle: {
        '0%, 100%': { transform: 'rotate(-3deg)' },
        '50%': { transform: 'rotate(3deg)' },
      },
      ping: {
        '0%, 100%': { transform: 'scale(1)' },
        '50%': { transform: 'scale(1.025)' }

      },
      button: {
        '0%, 100%': { transform: 'scale(1)' },
        '50%': { transform: 'scale(1.2)' }
      },
      spin: {
        '0%': {
          transform: 'rotate(0deg)'
        },
        '100%': {
          transform: 'rotate(360deg)'
        }
      }
    },
    animation: {
      wiggle: 'wiggle 1s ease-in-out infinite',
      ping: 'ping 1.5s infinite',
      button: 'button 0.8s infinite',
      spin: 'spin 1s linear infinite'
    }
  },
  plugins: [],
}