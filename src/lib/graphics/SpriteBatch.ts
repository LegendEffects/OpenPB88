import { Display, Texture } from "../graphics";
import { Color } from "../util";

function reverseArray(arr: any[]) {
  let newArray = [];
  for (var i = arr.length - 1; i >= 0; i--) {
    newArray.push(arr[i]);
  }
  return newArray;
}

function reverseInnerArrays(image: Uint8ClampedArray[][]) {
  let newArray = [];
  for(let i = 0; i < image.length; i++) {
    newArray[i] = reverseArray(image[i]);
  }

  return newArray;
}

export default class SpriteBatch {
  private display: Display;

  constructor(display: Display) {
    this.display = display;
  }

  public async draw(texture: Texture, x: number, y: number, flipX?: boolean, flipY?: boolean) {
    if(flipX === undefined) {
      flipX = false;
    }
    if(flipY === undefined) {
      flipY = false;
    }

    let image = await texture.getImage();
    
    if(flipY) {
      image = reverseArray(image);
    }
    if(flipX) {
      image = reverseInnerArrays(image);
    }

    for(let xo = 0; xo < image.length; xo++) {
      this.rowRender(x, y, xo, image);
    }
    
  }

  private rowRender(x: number, y: number, xo: number, image: Uint8ClampedArray[][]) {
    for(let yo = 0; yo < image[xo].length; yo++) {
      const xt = y + xo; // Don't even ask, for some reason this is correct
      const yt = x + yo;

      if(xt < 0 || yt < 0 || xt > this.display.width || yt > this.display.height) continue;

      if(Color.isTransparent(image[xo][yo])) {
        continue;
      }

      this.display.setPixel(xt, yt, Color.rgbToHex(Color.fromArray(image[xo][yo])));
    }
  }
}