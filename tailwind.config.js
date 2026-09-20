/** @type {import('tailwindcss').Config} */
import aposisPreset from './tailwind.preset.js';

export default {
  presets: [aposisPreset],
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  plugins: [],
};
