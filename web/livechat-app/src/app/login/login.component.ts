import {Component, OnInit} from '@angular/core';
import {UserService} from '../services/user.service';
import {CookieService} from 'angular2-cookie/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {

  username = '';
  password = '';
  tryLogin = false;
  error = false;

  constructor(private userService: UserService, private cookieService: CookieService, private router: Router) {
  }

  ngOnInit() {
  }

  login() {
    this.tryLogin = true;
    this.userService.login(this.username, this.password)
      .then(res => {
        this.cookieService.put('login', res.userId);
        this.cookieService.put('accessToken', res.access_token);
        this.router.navigate(['/dashboard']);
      })
      .catch(res => {
        this.tryLogin = false;
        this.error = true;
      })
  }

}
