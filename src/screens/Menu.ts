import { Screen, Texture } from '../lib/graphics';
import { IInputReceiver, RotaryInputType } from "../lib/interfaces/Input";

import { Application } from "../index"
import floppy from "../assets/textures/floppy.json";


export default class Menu extends Screen implements IInputReceiver {
  private floppy: Texture;
  private app: Application;

  private position = { x: 0, y: 0 };
  private movingXAxis = true;

  constructor(app: Application) {
    super();

    this.app = app;
    this.floppy = Texture.fromColorMappedArray(floppy.data);
  }

  async render() {
    const batch = this.app.getSpriteBatch();
    
    batch.draw(this.floppy, this.position.x, this.position.y, false, false);
  }

  onRotaryInput(type: RotaryInputType) {
    switch(type) {
      case RotaryInputType.leftTurn:
        if(this.movingXAxis) {
          this.position.x--;
        } else {
          this.position.y--;
        }
        break;
      case RotaryInputType.rightTurn:
        if(this.movingXAxis) {
          this.position.x++;
        } else {
          this.position.y++;
        }
        break;
      case RotaryInputType.press:
        this.movingXAxis = !this.movingXAxis;
        break;
    }
  }
}