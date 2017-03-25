import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserService} from "./user.service";
import {CurrentUserService} from "./current-user.service";
import {SettingService} from "./setting.service";

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    UserService,
    CurrentUserService,
    SettingService
  ],
  declarations: []
})
export class ServicesModule {
}
