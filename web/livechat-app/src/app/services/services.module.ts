import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserService} from './user.service';
import {CurrentUserService} from './current-user.service';
import {SettingService} from './setting.service';
import {WebsocketService} from './websocket.service';
import {StatisticsService} from './statistics.service';
import {CookieService} from 'angular2-cookie/core';
import {QuestionsService} from './questions.service';
import {ConversationsService} from './conversations.service';
import {ChatMessagesResolver} from '../chats/chat-messages.resolver';
import {MessagesService} from './messages.service';

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
    QuestionsService,
    ConversationsService,
    ChatMessagesResolver,
    MessagesService
  ],
  declarations: []
})
export class ServicesModule {
}
