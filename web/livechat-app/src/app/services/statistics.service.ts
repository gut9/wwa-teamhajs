import {Injectable} from '@angular/core';
import {Http} from "@angular/http";
import {CookieService} from "angular2-cookie/core";

@Injectable()
export class StatisticsService {

  constructor(private http: Http, private cookieService: CookieService) {
  }

  private HOST = 'http://172.18.199.167:8000/';

  getStatistics(): Promise<any> {
    return this.http.get(this.HOST + 'api/getStats?userId=' + this.cookieService.get('userId') + '?accessToken=' + this.cookieService.get('accessToken'))
      .map(r => r.json())
      .toPromise()
  }

  getHourStatistics(): Promise<any> {
    return this.http.get(this.HOST + 'api/hourStats?userId=' + this.cookieService.get('userId'))
      .map(r => r.json())
      .toPromise()
  }

}
