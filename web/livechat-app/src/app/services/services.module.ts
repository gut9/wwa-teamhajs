import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserService} from "./user.service";
import {CurrentUserService} from "./current-user.service";
import {SettingService} from "./setting.service";
import {StatisticsService} from "./statistics.service";
import {CookieService} from "angular2-cookie/core";

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    UserService,
    CurrentUserService,
    SettingService,
    StatisticsService,
    CookieService
  ],
  declarations: []
})
export class ServicesModule {
}
