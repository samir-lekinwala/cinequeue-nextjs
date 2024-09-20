// /** @type {import('tailwindcss').Config} */
import withMT from '@material-tailwind/react/utils/withMT'
// import { defaultTheme } from 'tailwindcss/defaultTheme'
// const withMT = require("@material-tailwind/react/utils/withMT")

const defaultTheme = require('tailwindcss/defaultTheme')
const config = {
  content: [
    './app/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './app/components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', ...defaultTheme.fontFamily.sans],
      },
      colors: {},
    },
  },
  plugins: [],
}

const withMaterialTailwind = withMT(config)

export default withMaterialTailwind
