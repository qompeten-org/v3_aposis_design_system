import { primitiveColors } from './colors';

/**
 * APOSIS Design System v3.1 - Full Semantic Tokens Suite
 * Exact mapping of Text, Background, Surface, Layer, Elevation, Icon, and Border from Figma specification.
 */

export const semanticTextColors = {
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

export const semanticBackgroundColors = {
  light: {
    default: '#FFFFFF',
    subtle: primitiveColors.slate[10], // #F8FAFC
  },
  dark: {
    default: primitiveColors.slate[100], // #0F172A
    subtle: primitiveColors.slate[90], // #212B3C
  },
} as const;

export const semanticSurfaceColors = {
  light: {
    field: primitiveColors.slate[20], // #F1F5F9
    fieldHover: primitiveColors.slate[30], // #E2E8F0
    amberActive: primitiveColors.amber[70], // #D97706
    amberSubtle: primitiveColors.amber[10], // #FFFBEB
    amberTint: primitiveColors.amber[20], // #FEF3C7
    amberTintHover: primitiveColors.amber[30], // #FDE68A
    brand: primitiveColors.blue[60], // #0F62FE
    brandActive: primitiveColors.blue[80], // #002D9C
    brandHover: primitiveColors.blue[70], // #0043CE
    brandSubtle: primitiveColors.blue[10], // #EDF5FF
    brandTint: primitiveColors.blue[20], // #D0E2FF
    brandTintHover: primitiveColors.blue[30], // #A6C8FF
    cyanActive: primitiveColors.cyan[80], // #0E7490
    cyanHover: primitiveColors.cyan[30], // #A5F3FC
    cyanTint: primitiveColors.cyan[20], // #CFFAFE
    default: '#FFFFFF',
    disabled: primitiveColors.slate[40], // #CBD5E1
    greenActive: primitiveColors.green[80], // #15803D
    greenSubtle: primitiveColors.green[10], // #F0FDF4
    greenTint: primitiveColors.green[20], // #DCFCE7
    greenTintHover: primitiveColors.green[40], // #86EFAC
    rose: primitiveColors.rose[90], // #680D12
    roseActive: primitiveColors.rose[80], // #8F131A
    roseHover: primitiveColors.rose[70], // #B81A22
    roseSubtle: primitiveColors.rose[10], // #FFEFEF
    roseTint: primitiveColors.rose[20], // #FFCCD1
    roseTintHover: primitiveColors.rose[30], // #FF99A1
    slate: primitiveColors.slate[80], // #283445
    slateActive: primitiveColors.slate[100], // #0F172A
    slateHover: primitiveColors.slate[90], // #212B3C
    slateSubtle: primitiveColors.slate[20], // #F1F5F9
    slateTint: primitiveColors.slate[30], // #E2E8F0
    slateTintHover: primitiveColors.slate[40], // #CBD5E1
    violetActive: primitiveColors.violet[70], // #9333EA
    violetTint: primitiveColors.violet[20], // #F3E8FF
    violetTintHover: primitiveColors.violet[30], // #E9D5FF
  },
  dark: {
    field: primitiveColors.slate[90], // #212B3C
    fieldHover: primitiveColors.slate[80], // #283445
    amberActive: primitiveColors.amber[70], // #D97706
    amberSubtle: primitiveColors.amber[90], // #83380B
    amberTint: primitiveColors.amber[90], // #83380B
    amberTintHover: primitiveColors.amber[80], // #B45309
    brand: primitiveColors.blue[60], // #0F62FE
    brandActive: primitiveColors.blue[80], // #002D9C
    brandHover: primitiveColors.blue[70], // #0043CE
    brandSubtle: primitiveColors.blue[100], // #101831
    brandTint: primitiveColors.blue[100], // #101831
    brandTintHover: primitiveColors.blue[90], // #0B1F53
    cyanActive: primitiveColors.cyan[80], // #0E7490
    cyanHover: primitiveColors.cyan[90], // #164E63
    cyanTint: primitiveColors.cyan[100], // #083344
    default: primitiveColors.slate[100], // #0F172A
    disabled: primitiveColors.slate[70], // #475569
    greenActive: primitiveColors.green[80], // #15803D
    greenSubtle: primitiveColors.green[100], // #052E16
    greenTint: primitiveColors.green[100], // #052E16
    greenTintHover: primitiveColors.green[90], // #14532D
    rose: primitiveColors.rose[80], // #8F131A
    roseActive: primitiveColors.rose[60], // #E6212A
    roseHover: primitiveColors.rose[70], // #B81A22
    roseSubtle: primitiveColors.rose[100], // #43080C
    roseTint: primitiveColors.rose[100], // #43080C
    roseTintHover: primitiveColors.rose[90], // #680D12
    slate: primitiveColors.slate[90], // #212B3C
    slateActive: primitiveColors.slate[70], // #475569
    slateHover: primitiveColors.slate[80], // #283445
    slateSubtle: primitiveColors.slate[90], // #212B3C
    slateTint: primitiveColors.slate[90], // #212B3C
    slateTintHover: primitiveColors.slate[80], // #283445
    violetActive: primitiveColors.violet[80], // #7E22CE
    violetTint: primitiveColors.violet[100], // #581C87
    violetTintHover: primitiveColors.violet[90], // #6B21A8
  },
} as const;

export const semanticLayerColors = {
  light: {
    layer: primitiveColors.slate[10], // #F8FAFC
    layerActive: primitiveColors.slate[30], // #E2E8F0
    alertHover: 'rgba(245, 158, 11, 0.12)', // Amber 60-alpha-12
    alertSelected: 'rgba(245, 158, 11, 0.06)', // Amber 60-alpha-6
    brandActive: 'rgba(15, 98, 254, 0.16)', // Blue 60-alpha-16
    brandHover: 'rgba(15, 98, 254, 0.12)', // Blue 60-alpha-12
    brandSelected: 'rgba(15, 98, 254, 0.06)', // Blue 60-alpha-6
    dangerHover: 'rgba(230, 33, 42, 0.12)', // Rose 60-alpha-12
    dangerSelected: 'rgba(230, 33, 42, 0.06)', // Rose 60-alpha-6
    layerHover: primitiveColors.slate[20], // #F1F5F9
    successHover: 'rgba(34, 197, 94, 0.12)', // Green 60-alpha-12
    successSelected: 'rgba(34, 197, 94, 0.06)', // Green 60-alpha-6
    tint: 'rgba(100, 116, 139, 0.04)', // Slate 60-alpha-4
    tintActive: 'rgba(100, 116, 139, 0.12)', // Slate 60-alpha-12
    tintHover: 'rgba(100, 116, 139, 0.08)', // Slate 60-alpha-8
    tintSelected: 'rgba(100, 116, 139, 0.08)', // Slate 60-alpha-8
    tintSelectedHover: 'rgba(100, 116, 139, 0.16)', // Slate 60-alpha-16
  },
  dark: {
    layer: primitiveColors.slate[90], // #212B3C
    layerActive: primitiveColors.slate[70], // #475569
    alertHover: 'rgba(245, 158, 11, 0.12)',
    alertSelected: 'rgba(245, 158, 11, 0.06)',
    brandActive: 'rgba(15, 98, 254, 0.48)', // Blue 60-alpha-48
    brandHover: 'rgba(15, 98, 254, 0.32)', // Blue 60-alpha-32
    brandSelected: 'rgba(15, 98, 254, 0.64)', // Blue 60-alpha-64
    dangerHover: 'rgba(67, 8, 12, 0.12)', // Rose 100-alpha-12
    dangerSelected: 'rgba(67, 8, 12, 0.06)', // Rose 100-alpha-6
    layerHover: primitiveColors.slate[80], // #283445
    successHover: 'rgba(5, 46, 22, 0.12)', // Green 100-alpha-12
    successSelected: 'rgba(5, 46, 22, 0.06)', // Green 100-alpha-6
    tint: 'rgba(15, 23, 42, 0.24)', // Slate 100-alpha-24
    tintActive: 'rgba(100, 116, 139, 0.16)', // Slate 60-alpha-16
    tintHover: 'rgba(100, 116, 139, 0.08)', // Slate 60-alpha-8
    tintSelected: 'rgba(100, 116, 139, 0.12)', // Slate 60-alpha-12
    tintSelectedHover: 'rgba(100, 116, 139, 0.20)', // Slate 60-alpha-20
  },
} as const;

export const semanticElevationColors = {
  high: 'rgba(0, 0, 0, 0.16)',
  low: 'rgba(0, 0, 0, 0.08)',
  medium: 'rgba(0, 0, 0, 0.12)',
} as const;

export const semanticIconColors = {
  light: {
    disabled: 'rgba(15, 23, 42, 0.24)', // Slate 100-alpha-24
    helper: primitiveColors.slate[60], // #64748B
    interactive: primitiveColors.blue[60], // #0F62FE
    inverse: '#FFFFFF',
    onColor: '#FFFFFF',
    onColorDisabled: primitiveColors.slate[50], // #94A3B8
    placeholder: primitiveColors.slate[40], // #CBD5E1
    primary: primitiveColors.slate[100], // #0F172A
    secondary: primitiveColors.slate[70], // #475569
    tertiaryAmber: primitiveColors.amber[80], // #B45309
    tertiaryCyan: primitiveColors.cyan[80], // #0E7490
    tertiaryGreen: primitiveColors.green[80], // #15803D
    tertiaryRose: primitiveColors.rose[60], // #E6212A
    tertiaryViolet: primitiveColors.violet[70], // #9333EA
  },
  dark: {
    disabled: 'rgba(15, 23, 42, 0.24)',
    helper: primitiveColors.slate[50], // #94A3B8
    interactive: primitiveColors.blue[60], // #0F62FE
    inverse: '#000000',
    onColor: '#FFFFFF',
    onColorDisabled: primitiveColors.slate[50], // #94A3B8
    placeholder: primitiveColors.slate[40], // #CBD5E1
    primary: primitiveColors.slate[10], // #F8FAFC
    secondary: primitiveColors.slate[20], // #F1F5F9
    tertiaryAmber: primitiveColors.amber[50], // #FBBF24
    tertiaryCyan: primitiveColors.green[50], // #4ADE80 (Figma spec note)
    tertiaryGreen: primitiveColors.green[50], // #4ADE80
    tertiaryRose: primitiveColors.rose[50], // #FF3941
    tertiaryViolet: primitiveColors.violet[50], // #C084FC
  },
} as const;

export const semanticBorderColors = {
  light: {
    alert: primitiveColors.amber[60], // #F59E0B
    card: primitiveColors.slate[40], // #CBD5E1
    cardHover: primitiveColors.blue[60], // #0F62FE
    danger: primitiveColors.rose[50], // #FF3941
    disabled: primitiveColors.slate[30], // #E2E8F0
    info: primitiveColors.blue[60], // #0F62FE
    interactive: primitiveColors.blue[60], // #0F62FE
    inverse: '#000000',
    strong01: primitiveColors.slate[50], // #94A3B8
    strong02: primitiveColors.slate[60], // #64748B
    strong03: primitiveColors.slate[70], // #475569
    subtle01: primitiveColors.slate[20], // #F1F5F9
    subtle02: primitiveColors.slate[30], // #E2E8F0
    subtle03: primitiveColors.slate[40], // #CBD5E1
    success: primitiveColors.green[70], // #16A34A
  },
  dark: {
    alert: primitiveColors.amber[60], // #F59E0B
    card: primitiveColors.slate[70], // #475569
    cardHover: primitiveColors.blue[60], // #0F62FE
    danger: primitiveColors.rose[50], // #FF3941
    disabled: primitiveColors.slate[70], // #475569
    info: primitiveColors.blue[60], // #0F62FE
    interactive: primitiveColors.blue[60], // #0F62FE
    inverse: '#FFFFFF',
    strong01: primitiveColors.slate[60], // #64748B
    strong02: primitiveColors.slate[50], // #94A3B8
    strong03: primitiveColors.slate[40], // #CBD5E1
    subtle01: primitiveColors.slate[90], // #212B3C
    subtle02: primitiveColors.slate[80], // #283445
    subtle03: primitiveColors.slate[70], // #475569
    success: primitiveColors.green[70], // #16A34A
  },
} as const;
