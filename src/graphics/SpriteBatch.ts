import Sprite from "./sprite";
import { Display } from "src/display/Display";
import { Color } from "../util";

export default class SpriteBatch {
  private drawing = false;
  private display: Display;

  constructor(display: Display) {
    this.display = display;
  }

  public begin() {
    this.drawing = true;
  }

  public end() {
    this.drawing = false;
  }

  public draw(sprite: Sprite, x: number, y: number) {
    if(!this.drawing) {
      throw new Error("SpriteBatch.begin() needs to be called before drawing.");
    }

    const image = sprite.getImage();

    for(let xo = 0; xo < image.length; xo++) {
      for(let yo = 0; yo < image[xo].length; yo++) {
        const xt = y + xo; // Don't even ask, for some reason this is correct
        const xy = x + yo;

        if(xt < 0 || xy < 0 || xt > this.display.width || xy > this.display.height) continue;

        const hex = Color.rgbToHex(Color.fromArray(image[xo][yo]));

        this.display.setPixel(xt, xy, hex);
      }
    }
  }
}