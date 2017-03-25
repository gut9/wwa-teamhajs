import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserService} from "./user.service";
import {CurrentUserService} from "./current-user.service";
import {SettingService} from "./setting.service";
import {BrowserModule} from '@angular/platform-browser';
import {WebsocketService} from './websocket.service';
import {StatisticsService} from "./statistics.service";
import {CookieService} from "angular2-cookie/core";
<<<<<<< HEAD
import {QuestionsService} from "./questions.service";
=======
import {ConversationsService} from './conversations.service';
>>>>>>> 5eb84feeaaa5d9b98f35d3dd2759da536339ba39

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    UserService,
    CurrentUserService,
    SettingService,
    WebsocketService,
    SettingService,
    StatisticsService,
    CookieService,
<<<<<<< HEAD
    QuestionsService
=======
    ConversationsService
>>>>>>> 5eb84feeaaa5d9b98f35d3dd2759da536339ba39
  ],
  declarations: []
})
export class ServicesModule {
}
