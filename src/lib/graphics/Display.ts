import { Canvas } from 'canvas';
import { Frame } from '../util/pbot-lib';
import { Color } from '../util';

export default class Display extends Canvas {
  private backgroundColor: string = '#000';

  //
  // Other
  //
  public setBackground(color: string) {
    this.backgroundColor = color;
  }

  public reset() {
    const ctx = this.getContext('2d');

    ctx.clearRect(0, 0, this.width, this.height);

    // Fill the background
    ctx.fillStyle = this.backgroundColor;
    ctx.fillRect(0, 0, this.width, this.height);
  }

  public asFrame() {
    let frame: Frame = [];

    for(let x = 0; x < this.width; x++) {
      let row: string[] = [];

      for(let y = 0; y < this.height; y++) {
        row.push(Color.rgbToHex(Color.fromArray(this.getPixel(x, y))));
      }

      frame.push(row);
    }

    return frame;
  }

  //
  // Pixels
  //
  public setPixel(x: number, y: number, color: string) {
    const ctx = this.getContext('2d');

    ctx.fillStyle = color;
    ctx.fillRect(x, y, 1, 1);
  }

  public getPixel(x: number, y: number): Uint8ClampedArray {
    return this.getContext('2d').getImageData(x, y, 1, 1).data;
  }
}