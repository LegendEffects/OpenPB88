import { Palette } from "./pbot-lib";

export const palette = {
  "a": "#ff0000",
  "b": "#008000",
  "c": "#0000ff",
  "d": "#ffffff",
  "e": "#000000",
  "f": "#ffff00",
  "g": "#800000",
  "h": "#800080",
  "i": "#6441a5",
  "j": "#000080",
  "k": "#006400",
  "l": "#ffd700",
  "m": "#f0e68c",
  "n": "#daa520",
  "o": "#00ffff",
  "p": "#008080",
  "q": "#00ced1",
  "r": "#ffa500",
  "s": "#ff8c00",
  "t": "#ff4500",
  "u": "#ffc0cb",
  "v": "#ff1393",
  "w": "#ffa07a",
  "x": "#858d86",
  "y": "#4c504d"
}

export function get(code: keyof typeof palette) {
  return palette[code];
}

export default palette;