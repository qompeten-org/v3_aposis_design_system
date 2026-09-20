/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      colors: {
        aposis: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9', // Core brand cyan/sky
          600: '#0284c7', // Primary button
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
          950: '#082f49',
        },
        primary: {
          DEFAULT: 'hsl(var(--aposis-primary, 201 96% 32%))',
          hover: 'hsl(var(--aposis-primary-hover, 201 96% 26%))',
          light: 'hsl(var(--aposis-primary-light, 204 94% 94%))',
          foreground: '#ffffff',
        },
        secondary: {
          DEFAULT: 'hsl(var(--aposis-secondary, 215 19% 35%))',
          hover: 'hsl(var(--aposis-secondary-hover, 215 19% 25%))',
          light: 'hsl(var(--aposis-secondary-light, 210 20% 96%))',
          foreground: '#ffffff',
        },
        success: {
          DEFAULT: '#10b981',
          hover: '#059669',
          light: '#ecfdf5',
          foreground: '#ffffff',
        },
        warning: {
          DEFAULT: '#f59e0b',
          hover: '#d97706',
          light: '#fffbeb',
          foreground: '#ffffff',
        },
        danger: {
          DEFAULT: '#ef4444',
          hover: '#dc2626',
          light: '#fef2f2',
          foreground: '#ffffff',
        },
        neutral: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          950: '#020617',
        }
      },
      fontFamily: {
        sans: ['Nunito', 'Nunito Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'aposis-sm': '0 1px 2px 0 rgba(15, 23, 42, 0.05)',
        'aposis-md': '0 4px 6px -1px rgba(15, 23, 42, 0.08), 0 2px 4px -2px rgba(15, 23, 42, 0.06)',
        'aposis-lg': '0 10px 15px -3px rgba(15, 23, 42, 0.08), 0 4px 6px -4px rgba(15, 23, 42, 0.04)',
        'aposis-card': '0 10px 25px -5px rgba(2, 132, 199, 0.07), 0 8px 10px -6px rgba(15, 23, 42, 0.04)',
      },
      borderRadius: {
        'aposis-sm': '6px',
        'aposis': '10px',
        'aposis-md': '12px',
        'aposis-lg': '16px',
        'aposis-xl': '20px',
      }
    },
  },
  plugins: [],
};
