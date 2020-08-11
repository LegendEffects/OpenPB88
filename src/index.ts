import App from "./app";
import Menu from "./screens/Menu";
import WebSocketAdapter from "./display/adapters/WebSocketAdapter";
import SpriteBatch from "./graphics/SpriteBatch";

export class Application extends App {
  private spriteBatch: SpriteBatch;

  private menuScreen: Menu;

  constructor() {
    super({
      width: 24,
      height: 24
    });

    this.setDisplayAdapter(new WebSocketAdapter(this));
    
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