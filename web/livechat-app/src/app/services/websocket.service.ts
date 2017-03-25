import {Injectable} from '@angular/core';
import {$WebSocket} from 'angular2-websocket/angular2-websocket';
import {Subject} from 'rxjs';

@Injectable()
export class WebsocketService {
  private ws;
  private webSocket: Subject<any>;

  constructor() {
    this.ws = new $WebSocket("ws://172.18.199.167:8000/api/34873768");
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
    this.ws.send4Promise({userId: '34873768'})
      .then(res => console.log('udalo sie'))
      .catch(err => console.log(err));
  }

  subject(): Subject<any> {
    return this.webSocket;
  }

  send(data) {
    this.ws.send4Promise(data);
  }
}

