import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {ChatsComponent} from './chats.component';
import {ChatComponent} from './chat/chat.component';
import {ChatMessagesResolver} from './chat-messages.resolver';
const chatsRoutes: Routes = [
  {
    path: '',
    component: ChatsComponent,
    children: [
      {
        path: 'client/:clientId/auction/:auctionId',
        component: ChatComponent,
        resolve: {conversation: ChatMessagesResolver}
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(chatsRoutes)
  ],
  exports: [
    RouterModule
  ],
  providers: []
})


export class ChatsRoutingModule {
}
