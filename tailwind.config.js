/** @type {import('tailwindcss').Config} */

const px = { ...Array.from(Array(101)).map((_, i) => `${i}px`) };
const zIndex = { ...Array.from(Array(1001)).map((_, i) => `${i}`) };
const dimension = { ...Array.from(Array(2001)).map((_, i) => `${i}px`) };

module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            width: dimension,
            height: dimension,
            padding: px,
            margin: px,
            fontSize: px,
            lineHeight: px,
            zIndex
        }
    },
    plugins: []
};
