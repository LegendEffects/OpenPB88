import Screen from "../graphics/Screen";
import Sprite from "../graphics/sprite";

import floppy from "../assets/sprites/floppy.json";
import { Application } from "../index"
import { IInputReceiver, RotaryInputType } from "../interfaces/Input";

export default class Menu extends Screen implements IInputReceiver {
  private floppy: Sprite;
  private app: Application;

  private position = {
    x: 0,
    y: 0
  };
  private movingXAxis = true;

  constructor(app: Application) {
    super();

    this.app = app;
    this.floppy = Sprite.fromColorMappedArray(floppy.data);
  }

  render() {
    const batch = this.app.getSpriteBatch();

    batch.begin();
    batch.draw(this.floppy, this.position.x, this.position.y);
    batch.end();
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