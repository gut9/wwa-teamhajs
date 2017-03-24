import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DashboardComponent} from './dashboard.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import {DashboardRoutingModule} from './dashboard-routing.modules';
import {ChatsModule} from '../chats/chats.module';

@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ChatsModule
  ],
  exports: [
    DashboardComponent
  ],
  declarations: [
    DashboardComponent,
    SidebarComponent
  ]
})
export class DashboardModule {
}
