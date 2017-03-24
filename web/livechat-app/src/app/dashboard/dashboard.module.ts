import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DashboardComponent} from './dashboard.component';
import { SidebarComponent } from './sidebar/sidebar.component';

@NgModule({
  imports: [
    CommonModule
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
