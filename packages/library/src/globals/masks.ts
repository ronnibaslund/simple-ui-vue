export const masks = [
  'squircle', // mask-squircle
  'heart', // mask-heart
  'hexagon', // mask-hexagon
  'hexagon-2', // mask-hexagon-2
  'decagon', // mask-decagon
  'pentagon', // mask-pentagon
  'diamond', // mask-diamond
  'circle', // mask-circle
  'square', // mask-square
  'parallelogram', // mask-parallelogram
  'parallelogram-2', // mask-parallelogram-2
  'parallelogram-3', // mask-parallelogram-3
  'parallelogram-4', // mask-parallelogram-4
  'star', // mask-star
  'triangle', // mask-triangle
  'triangle-2', // mask-triangle-2
  'triangle-3', // mask-triangle-3
  'triangle-4', // mask-triangle-4
] as const

export type Masks = (typeof masks)[number]
