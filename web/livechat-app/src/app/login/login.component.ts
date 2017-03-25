import {Component, OnInit} from '@angular/core';
import {UserService} from '../services/user.service';
import {CookieService} from 'angular2-cookie/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {

  username = '';
  password = '';

  constructor(private userService: UserService, private cookieService:CookieService) {
  }

  ngOnInit() {
  }

  login() {
    this.userService.login(this.username, this.password)
      .then(res => {
        this.cookieService.put('login',res.userId);
        this.cookieService.put('accessToken',res.access_token);
      });
  }

}
