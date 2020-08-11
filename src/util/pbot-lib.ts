import Pako from 'pako';
import palette from 'src/assets/palette.json';

//
// Types
//
export type Frame = string[][];
export type Palette = { [id: string]: string };
export type Body = string[];

export interface BasePixelBotResponse {
  error: boolean;
  palette: Palette;
}

export interface AnimatedDrawing extends BasePixelBotResponse {
  frames: Frame[];
  delay: number;
}

export interface StaticDrawing extends BasePixelBotResponse {
  frame: Frame;
}

//
// Utility
//
function getPalette(extension: Palette): Palette {
  return Object.assign({}, palette, extension);
}

//
// Functions
//
export function importFrom(raw: string) {
  if(raw.startsWith('!')) {
    raw = raw.substr(1, raw.length); // Remove start of command if done.
  }

  const body = raw.split('.');
  const command = body.shift();

  switch(command) {
    case 'pbd':
      // Drawing - Grid
  }
}

export function importColorMappedDrawing(body: Body) {
  let foundColors = {};

  // const colors = body.shift()
}