/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        'index.html',
        './src/**/*.{js,jsx,ts,tsx}',
    ],
    theme: {
        fontFamily: {
            sans: ['Nunito Sans', 'sans-serif'],
            inter: ['Inter', 'sans-serif'],
        },
        extend: {
            //
        },
    },
    plugins: [],
}
