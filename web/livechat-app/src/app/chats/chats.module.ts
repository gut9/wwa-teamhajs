import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ChatsComponent} from './chats.component';
import { ChatComponent } from './chat/chat.component';
import {ChatsRoutingModule} from './chats-routing.modules';
import { ChatSidebarComponent } from './chat-sidebar/chat-sidebar.component';
import {FormsModule} from '@angular/forms';
import {ChatMessagesResolver} from './chat-messages.resolver';

@NgModule({
  imports: [
    CommonModule,
    ChatsRoutingModule,
    FormsModule
  ],
  exports: [
    ChatsComponent
  ],
  providers:[ChatMessagesResolver],
  declarations: [
    ChatsComponent,
    ChatComponent,
    ChatSidebarComponent
  ]
})
export class ChatsModule {
}
