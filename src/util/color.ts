export type RGBComponent = {
  r: number,
  g: number,
  b: number
}

export function rgbToHex({r, g, b}: RGBComponent): string {
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

export function hexToRgb(hex: string) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

export function isTransparent(pixelData: Uint8ClampedArray) {
  return (pixelData[0] === 0) && (pixelData[1] === 0) && (pixelData[2] === 0) && (pixelData[3] === 0);
}

export function toArray({r, g, b}: RGBComponent): Uint8ClampedArray {
  const color = new Uint8ClampedArray(4);

  color[0] = r;
  color[1] = g;
  color[2] = b;
  color[3] = 255;

  return color;
}

export function fromArray(array: Uint8ClampedArray): RGBComponent {
  return {
    r: array[0],
    g: array[1],
    b: array[2]
  };
}
