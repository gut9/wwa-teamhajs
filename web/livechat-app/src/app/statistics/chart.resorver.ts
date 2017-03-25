import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {StatisticsService} from "../services/statistics.service";

@Injectable()
export class ChartResolver implements Resolve<any> {

  constructor(private satisticsService: StatisticsService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this.satisticsService.getHourStatistics();
  }

}
