import {Injectable} from '@angular/core';

@Injectable()
export class CurrentUserService {

  private auth = false;
  private login;
  private name;

  constructor() {
  }

  isAuthenticate() {
    return this.auth;
  }

  authenticate() {
    this.auth = true;
  }
}
