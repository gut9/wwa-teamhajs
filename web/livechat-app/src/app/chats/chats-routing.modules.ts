import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {ChatsComponent} from './chats.component';
import {ChatComponent} from './chat/chat.component';
const chatsRoutes: Routes = [
  {
    path: '',
    component: ChatsComponent,
    children: [
      {
        path: ':id',
        component: ChatComponent
      },
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
