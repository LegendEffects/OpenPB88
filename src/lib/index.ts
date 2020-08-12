import { Display, Screen, DisplayAdapters } from './graphics';
import { IInputReceiver } from "./interfaces/Input";

type AppSettings = {
  width: number;
  height: number;
}

export default class PixelBotApp {
  private settings: AppSettings;
  private display: Display;
  
  private displayAdapter?: DisplayAdapters.DisplayAdapter;
  private inputReceiver?: IInputReceiver;
  private screen?: Screen;

  constructor(settings: AppSettings) {
    this.settings = settings;
    this.display = new Display(settings.width, settings.height);
  }

  public setDisplayAdapter(adapter: DisplayAdapters.DisplayAdapter) {
    this.displayAdapter = adapter;
  }
  public setInputReceiver(receiver: IInputReceiver) {
    this.inputReceiver = receiver;
  }

  //
  // Getters
  //
  public getInputReceiver() {
    return this.inputReceiver;
  }
  public getSettings() {
    return this.settings;
  }
  public getDisplay() {
    return this.display;
  }
  
  //
  // Screens
  //
  public setScreen(screen: Screen) {
    if(screen !== undefined) {
      screen.hide();
    }
    
    this.screen = screen;
    screen.show();
  }
  public getScreen() {
    return this.screen;
  }

  //
  // General
  //
  async tick() {
    // Reset the screen
    await this.display.reset();

    // Render the screen
    if(this.screen === undefined) return;
    await this.screen.render();

    // Tell the display adapter to push it to the output device
    if(this.displayAdapter === undefined) return;
    await this.displayAdapter.render(this.display);
  }

  listen() {
    setInterval(async () => {
      await this.tick();
    }, 0)
  }
}