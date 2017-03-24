import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserService} from "./user.service";
import {CurrentUserService} from "./current-user.service";

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [UserService, CurrentUserService
  ],
  declarations: []
})
export class ServicesModule {
}
