/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      borderColor: {
        border: 'var(--border)',
      },
      ringColor: {
        ring: 'var(--ring)',
      },
      outlineColor: {
        ring: 'var(--ring)',
      },
      colors: {
        'outline-ring': 'rgba(255, 255, 255, 0.1)',
        background: 'var(--background)',
        foreground: 'var(--foreground)',
      },
      opacity: {
        '50': '0.5',
      },
    },
  },
  plugins: [],
} 