import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs';

@Injectable()
export class MessagesService {

  private HOST = 'http://172.18.199.167:8000/';

  constructor(private http: Http) {
  }

  getMessages(): Observable<any> {
    return this.http.get(`${this.HOST}api/messagesToRoom/?auctionId=6459854838&clientId=1`)
      .map(r => r.json());
  }
}
