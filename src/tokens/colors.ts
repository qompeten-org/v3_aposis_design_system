export const colors = {
  aposis: {
    50: '#f0f9ff',
    100: '#e0f2fe',
    200: '#bae6fd',
    300: '#7dd3fc',
    400: '#38bdf8',
    500: '#0ea5e9',
    600: '#0284c7', // Primary brand color
    700: '#0369a1',
    800: '#075985',
    900: '#0c4a6e',
    950: '#082f49',
  },
  primary: {
    DEFAULT: '#0284c7',
    hover: '#0369a1',
    light: '#e0f2fe',
    foreground: '#ffffff',
  },
  secondary: {
    DEFAULT: '#475569',
    hover: '#334155',
    light: '#f1f5f9',
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
} as const;

export const radii = {
  sm: '6px',
  base: '10px',
  md: '12px',
  lg: '16px',
  xl: '20px',
  full: '9999px',
} as const;

export const shadows = {
  sm: '0 1px 2px 0 rgba(15, 23, 42, 0.05)',
  md: '0 4px 6px -1px rgba(15, 23, 42, 0.08), 0 2px 4px -2px rgba(15, 23, 42, 0.06)',
  lg: '0 10px 15px -3px rgba(15, 23, 42, 0.08), 0 4px 6px -4px rgba(15, 23, 42, 0.04)',
  card: '0 10px 25px -5px rgba(2, 132, 199, 0.07), 0 8px 10px -6px rgba(15, 23, 42, 0.04)',
} as const;
