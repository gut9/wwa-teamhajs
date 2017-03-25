import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ChatsComponent} from './chats.component';
import { ChatComponent } from './chat/chat.component';
import {ChatsRoutingModule} from './chats-routing.modules';
import { ChatSidebarComponent } from './chat-sidebar/chat-sidebar.component';

@NgModule({
  imports: [
    CommonModule,
    ChatsRoutingModule
  ],
  exports: [
    ChatsComponent
  ],
  declarations: [
    ChatsComponent,
    ChatComponent,
    ChatSidebarComponent
  ]
})
export class ChatsModule {
}
