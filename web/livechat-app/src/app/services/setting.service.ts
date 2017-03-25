import {Injectable} from '@angular/core';
import {Http} from "@angular/http";

@Injectable()
export class SettingService {

  constructor(private http: Http) {
  }

  private HOST = 'http://172.18.199.167:8000/docs/';

  // TODO: change end point !!

  saveInvitationMessage(message: string): Promise<any> {
    return this.http.post(this.HOST + '??', message)
      .map(r => r.json())
      .toPromise();
  }

}
