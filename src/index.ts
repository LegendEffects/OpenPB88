import { SpriteBatch, DisplayAdapters } from "./lib/graphics"; 

import Menu from "./screens/Menu";
import PixelBotApp from "./lib";

export class Application extends PixelBotApp {
  private spriteBatch: SpriteBatch;

  private menuScreen: Menu;

  constructor() {
    super({
      width: 24,
      height: 24
    });

    this.setDisplayAdapter(new DisplayAdapters.WebSocketAdapter(this));
    
    // Finished Setup
    this.spriteBatch = new SpriteBatch(this.getDisplay());
    
    // Screens
    this.menuScreen = new Menu(this);
    this.setInputReceiver(this.menuScreen);
    this.setScreen(this.menuScreen);
  }

  getSpriteBatch() {
    return this.spriteBatch;
  }
}

const app = new Application();
app.listen();