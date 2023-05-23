/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",

    // Path to the tremor module
    "./node_modules/@tremor/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'animated-gradient-text-foreground-1': 'animated-gradient-text-foreground-1 8s infinite',
        'animated-gradient-text-background-1': 'animated-gradient-text-background-1 8s infinite',
        'animated-gradient-text-foreground-2': 'animated-gradient-text-foreground-2 8s infinite',
        'animated-gradient-text-background-2': 'animated-gradient-text-background-2 8s infinite',
        'animated-gradient-text-foreground-3': 'animated-gradient-text-foreground-3 8s infinite',
        'animated-gradient-text-background-3': 'animated-gradient-text-background-3 8s infinite',
      },
      keyframes: {
        "animated-gradient-text-foreground-1": {
          "0%, 16.667%, 100%": {
            opacity: 1
          },
          "33.333%, 83.333%": {
            opacity: 0
          }
        },
        "animated-gradient-text-background-1": {
          "0%, 16.667%, 100%": {
            opacity: 0
          },
          "25%, 91.667%": {
            opacity: 1
          }
        },
        "animated-gradient-text-foreground-2": {
          "0%, 100%": {
            opacity: 0
          },
          "33.333%, 50%": {
            opacity: 1
          },
          "16.667%, 66.667%": {
            opacity: 0
          }
        },
        "animated-gradient-text-background-2": {
          "0%, 100%": {
            opacity: 1
          },
          "33.333%, 50%": {
            opacity: 0
          },
          "25%, 58.333%": {
            opacity: 1
          }
        },
        "animated-gradient-text-foreground-3": {
          "0%, 50%, 100%": {
            opacity: 0
          },
          "66.667%, 83.333%": {
            opacity: 1
          }
        },
        "animated-gradient-text-background-3": {
          "0%, 58.333%, 91.667%, 100%": {
            opacity: 1
          },
          "66.667%, 83.333%": {
            opacity: 0
          }
        },
      }
    },
  },
  plugins: [],
}