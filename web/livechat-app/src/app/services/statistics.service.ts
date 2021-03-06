import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {CookieService} from 'angular2-cookie/core';
import {Observable} from "rxjs";

@Injectable()
export class StatisticsService {

  constructor(private http: Http, private cookieService: CookieService) {
  }

  private HOST = 'http://172.18.199.167:8000/';

  getStatistics(): Promise<any> {
    return this.http.get(`${this.HOST}api/getStats/?userId=34873768&accessToken=` + this.cookieService.get('accessToken'))
      .map(r => r.json())
      .toPromise()
  }

  getHourStatistics(): Observable<any> {
    return this.http.get(`${this.HOST}api/hourStats?userId=34873768`)
      .map(r => r.json())
  }

}
