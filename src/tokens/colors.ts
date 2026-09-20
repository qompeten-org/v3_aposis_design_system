/**
 * APOSIS Design System v3.1 - Primitive Palettes & Semantic Tokens
 * Exact hex values and semantic mapping from Figma specification
 */

export const primitiveColors = {
  green: {
    10: '#F0FDF4',
    20: '#DCFCE7',
    30: '#BBF7D0',
    40: '#86EFAC',
    50: '#4ADE80',
    60: '#22C55E',
    70: '#16A34A',
    80: '#15803D',
    90: '#14532D',
    100: '#052E16',
  },
  cyan: {
    10: '#ECFEFF',
    20: '#CFFAFE',
    30: '#A5F3FC',
    40: '#67E8F9',
    50: '#22D3EE',
    60: '#06B6D4',
    70: '#0891B2',
    80: '#0E7490',
    90: '#164E63',
    100: '#083344',
  },
  rose: {
    10: '#FFEFEF',
    20: '#FFCCD1',
    30: '#FF99A1',
    40: '#FF6670',
    50: '#FF3941',
    60: '#E6212A',
    70: '#B81A22',
    80: '#8F131A',
    90: '#680D12',
    100: '#43080C',
  },
  amber: {
    10: '#FFFBEB',
    20: '#FEF3C7',
    30: '#FDE68A',
    40: '#FCD34D',
    50: '#FBBF24',
    60: '#F59E0B',
    70: '#D97706',
    80: '#B45309',
    90: '#83380B',
    100: '#451A03',
  },
  blue: {
    10: '#EDF5FF',
    20: '#D0E2FF',
    30: '#A6C8FF',
    40: '#78A9FF',
    50: '#4589FF',
    60: '#0F62FE',
    70: '#0043CE',
    80: '#002D9C',
    90: '#0B1F53',
    100: '#101831',
  },
  violet: {
    10: '#FAF5FF',
    20: '#F3E8FF',
    30: '#E9D5FF',
    40: '#D8B4FE',
    50: '#C084FC',
    60: '#A855F7',
    70: '#9333EA',
    80: '#7E22CE',
    90: '#6B21A8',
    100: '#581C87',
  },
  slate: {
    10: '#F8FAFC',
    20: '#F1F5F9',
    30: '#E2E8F0',
    40: '#CBD5E1',
    50: '#94A3B8',
    60: '#64748B',
    70: '#475569',
    80: '#283445',
    90: '#212B3C',
    100: '#0F172A',
  },
} as const;

const semanticTextColorsLocal = {
  light: {
    disabled: 'rgba(15, 23, 42, 0.24)', // Slate 100-alpha-24
    error: primitiveColors.rose[60], // #E6212A
    errorHover: primitiveColors.rose[70], // #B81A22
    helper: primitiveColors.slate[60], // #64748B
    interactive: primitiveColors.blue[60], // #0F62FE
    interactiveHover: primitiveColors.blue[70], // #0043CE
    inverse: '#FFFFFF',
    onColor: '#FFFFFF',
    onColorDisabled: primitiveColors.slate[50], // #94A3B8
    placeholder: primitiveColors.slate[50], // #94A3B8
    primary: primitiveColors.slate[100], // #0F172A
    secondary: primitiveColors.slate[70], // #475569
    tertiaryAmber: primitiveColors.amber[80], // #B45309
    tertiaryCyan: primitiveColors.cyan[80], // #0E7490
    tertiaryGreen: primitiveColors.green[80], // #15803D
    tertiaryViolet: primitiveColors.violet[70], // #9333EA
  },
  dark: {
    disabled: 'rgba(255, 255, 255, 0.24)',
    error: primitiveColors.rose[60],
    errorHover: primitiveColors.rose[70],
    helper: primitiveColors.slate[60],
    interactive: primitiveColors.blue[50], // #4589FF
    interactiveHover: primitiveColors.blue[50], // #4589FF
    inverse: '#FFFFFF',
    onColor: '#FFFFFF',
    onColorDisabled: primitiveColors.slate[60], // #64748B
    placeholder: primitiveColors.slate[70], // #475569
    primary: '#FFFFFF',
    secondary: primitiveColors.slate[30], // #E2E8F0
    tertiaryAmber: primitiveColors.amber[40], // #FCD34D
    tertiaryCyan: primitiveColors.cyan[40], // #67E8F9
    tertiaryGreen: primitiveColors.green[40], // #86EFAC
    tertiaryViolet: primitiveColors.violet[40], // #D8B4FE
  },
} as const;

export const colors = {
  ...primitiveColors,
  semantic: semanticTextColorsLocal,
  primary: {
    DEFAULT: primitiveColors.blue[60],
    hover: primitiveColors.blue[70],
    light: primitiveColors.blue[20],
    foreground: '#FFFFFF',
  },
  secondary: {
    DEFAULT: primitiveColors.slate[70],
    hover: primitiveColors.slate[80],
    light: primitiveColors.slate[20],
    foreground: '#FFFFFF',
  },
  success: {
    DEFAULT: primitiveColors.green[60],
    hover: primitiveColors.green[70],
    light: primitiveColors.green[10],
    foreground: '#FFFFFF',
  },
  warning: {
    DEFAULT: primitiveColors.amber[60],
    hover: primitiveColors.amber[70],
    light: primitiveColors.amber[10],
    foreground: '#FFFFFF',
  },
  danger: {
    DEFAULT: primitiveColors.rose[60],
    hover: primitiveColors.rose[70],
    light: primitiveColors.rose[10],
    foreground: '#FFFFFF',
  },
  neutral: primitiveColors.slate,
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
