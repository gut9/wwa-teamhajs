import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import {CurrentUserService} from "./current-user.service";

@Injectable()
export class UserService {

  private HOST = 'http://172.18.199.167:8000/docs/';

  constructor(private http: Http, private currentUser: CurrentUserService) {
  }

  // TODO: change endpoint in http.post

  login(email: string, password: string): Promise<any> {
    return this.http.post(this.HOST + 'auth/login', {
      username: email,
      password: password
    })
      .map(r => r.json())
      .toPromise()
      .then(res => this.currentUser.authenticate());
  }

}
