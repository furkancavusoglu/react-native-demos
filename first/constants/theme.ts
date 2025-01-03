export const colors = {
  primary: '#5e0acc',
  primaryDark: '#4a0599',
  secondary: '#f31282',
  background: '#311b6b',
  inputBackground: '#e4d0ff',
  inputText: '#120438',
  white: '#ffffff',
  black: '#000000',
  overlay: 'rgba(0, 0, 0, 0.5)',
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
} as const;

export const borderRadius = {
  sm: 6,
  md: 12,
  circle: 20,
} as const;

export const typography = {
  sizes: {
    body: 16,
    title: 24,
    subtitle: 18,
  },
  weights: {
    regular: '400',
    bold: '700',
  },
} as const;

export const shadows = {
  default: {
    elevation: 4,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
} as const;

export const hitSlop = {
  small: { top: 4, right: 4, bottom: 4, left: 4 },
  medium: { top: 8, right: 8, bottom: 8, left: 8 },
} as const;
