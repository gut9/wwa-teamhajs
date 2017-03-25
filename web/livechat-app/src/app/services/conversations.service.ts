import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import {CookieService} from "angular2-cookie/core";

@Injectable()
export class ConversationsService {

  private HOST = 'http://172.18.199.167:8000/';

  constructor(private http: Http, private cookieService: CookieService) { }

  getConversations(): Promise<any> {
    return this.http.get(`${this.HOST}api/messages/?userId=34873768&accessToken=${this.cookieService.get('accessToken')}`)
      .map(r => r.json())
      .toPromise()
  }
}
