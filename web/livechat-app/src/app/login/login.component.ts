import {Component, OnInit} from '@angular/core';
import {Md5} from 'ts-md5/dist/md5';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {


  username = '';
  password = '';

  constructor() {
  }

  ngOnInit() {
  }

  login() {
    let hashPass = Md5.hashStr(this.password);
    console.log("Username: " + this.username, "Password: " + this.password, "HashPass: " + hashPass);
  }

}
