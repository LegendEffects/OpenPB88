import { DisplayAdapter } from "../../interfaces/Display";
import { Frame } from "../../util/pbot-lib";
import http, { Server } from 'http';
import { server as WebSocketServer, request as Request, connection as Connection } from 'websocket';
import { Display } from "../Display";

import { RotaryInputType, IInputReceiver } from "../../interfaces/Input";
import App from "../../app";

export default class WebSocketAdapter extends DisplayAdapter {
  private app: App;
  private httpServer: Server;
  private webSocketServer: WebSocketServer;
  
  constructor(app: App) {
    super();
    this.app = app;

    this.httpServer = http.createServer((req, res) => {
      console.log(`${new Date()} Received request for ${req.url}`);
      res.writeHead(404);
      res.end();
    });

    this.httpServer.listen(8080, () => {
      console.log(`${new Date()} HTTP Server is listening on 8080`);
    });

    this.webSocketServer = new WebSocketServer({
      httpServer: this.httpServer,
      autoAcceptConnections: true
    });

    this.webSocketServer.on('connect', this.connectionHandler(app));
  }

  render(display: Display) {
    this.webSocketServer.broadcast(JSON.stringify(display.asFrame()));

    // for(const connection of this.webSocketServer.connections) {
    //   connection.emit('frame', )
    // }
  }

  //
  // Private
  //
  private connectionHandler(app: App) {
    return (connection: Connection) => {
      console.log(`${new Date()} Connection accepted.`);
      connection.on('message', (message) => {
        if(app.getInputReceiver() !== null) {
          switch(message.utf8Data) {
            case 'rotary-left':
              (app.getInputReceiver() as IInputReceiver).onRotaryInput(RotaryInputType.leftTurn);
              break;
            
            case 'rotary-right':
              (app.getInputReceiver() as IInputReceiver).onRotaryInput(RotaryInputType.rightTurn);
              break;
            
            case 'rotary-press':
              (app.getInputReceiver() as IInputReceiver).onRotaryInput(RotaryInputType.press);
              break;
            
            default:
              console.log(message);
          }
        } else {
          console.log(message);
        }
      });
    }
  }
}