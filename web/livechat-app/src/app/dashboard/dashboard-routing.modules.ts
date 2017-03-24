import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from './dashboard.component';
import {NgModule} from '@angular/core';
const dashboardRoutes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'chats',
        loadChildren: '../chats/chats.module#ChatsModule'
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(dashboardRoutes)
  ],
  exports: [
    RouterModule
  ],
  providers: []
})


export class DashboardRoutingModule {
}
