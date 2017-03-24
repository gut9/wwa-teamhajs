import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';

@Injectable()
export class LoggedInGuard implements CanActivate {


  constructor(private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const hasAccess = confirm('Are you logged in?');
    if (hasAccess) {
      return hasAccess
    }
    this.router.navigate(['']);
    return false;

  }

}
