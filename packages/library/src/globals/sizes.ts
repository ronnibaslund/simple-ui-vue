export const sizes = ['xs', 'sm', 'md', 'lg'] as const
export type Sizes = (typeof sizes)[number]

export const xlSizes = ['xl', '2xl', '3xl', '4xl', '5xl', '6xl', '7xl', '8xl', '9xl'] as const
export type XlSizes = (typeof xlSizes)[number]

export const extendedSizes = [...sizes, ...xlSizes] as const
export type ExtendedSizes = (typeof extendedSizes)[number]

export const iconSizes = [
  2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 14, 16, 20, 24, 28, 32, 36, 40, 44, 48, 52, 56, 60, 64, 72,
  80, 96
] as const
export type IconSizes = (typeof iconSizes)[number]
