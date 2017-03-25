import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from './dashboard.component';
import {NgModule} from '@angular/core';
import {SettingsComponent} from "../settings/settings.component";
const dashboardRoutes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'chats',
        loadChildren: '../chats/chats.module#ChatsModule'
      },
      {
        path: 'settings',
        component: SettingsComponent
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
