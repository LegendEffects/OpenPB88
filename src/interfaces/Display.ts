import { Display } from "src/display/Display";
import App from "src/app";

export abstract class DisplayAdapter {
  render(display: Display) {}
}