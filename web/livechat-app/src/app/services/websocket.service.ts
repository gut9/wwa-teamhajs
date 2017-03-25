import {Injectable} from '@angular/core';
import {$WebSocket} from 'angular2-websocket/angular2-websocket';
import {Subject} from 'rxjs';

@Injectable()
export class WebsocketService {
  private ws;
  private webSocket: Subject<any>;

  constructor() {
    this.ws = new $WebSocket("ws://172.18.199.167:8000/api");
    this.webSocket = this.ws.getDataStream();
    this.webSocket.subscribe(
      res => {
        var count = JSON.parse(res.data).value;
        console.log('Got: ' + count);
      },
      function (e) {
        console.log('Error: ' + e.message);
      },
      function () {
        console.log('Completed');
      }
    );
  }

  subject(): Subject<any> {
    return this.webSocket;
  }
}

