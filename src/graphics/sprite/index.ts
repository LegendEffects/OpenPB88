import palette from '../../assets/palette.json';
import { Color } from '../../util';

export default class Sprite {
  private width: number;
  private height: number;
  private image: Uint8ClampedArray[][];

  constructor(width: number, height: number, image: Uint8ClampedArray[][]) {
    this.width = width;
    this.height = height;
    this.image = image;
  }

  //
  // Getters
  //
  public getWidth() {
    return this.width;
  }
  public getHeight() {
    return this.height;
  }
  public getImage() {
    return this.image;
  }

  public static fromColorMappedArray(data: string[][]): Sprite {
    let final = [];

    for(let x = 0; x < data.length; x++) {  
      let row: Uint8ClampedArray[] = [];

      for(let y = 0; y < data[x].length; y++) {  
        const code: string = data[x][y];
        const rgb = Color.hexToRgb((palette as any)[code]);
        if(rgb === null) {
          throw new SyntaxError("Unable to translate palette code to RGB values.");
        }
       
        row.push(Color.toArray(rgb));
      }

      final.push(row);
    }

    return new Sprite(data.length, data[0].length, final);
  }
}