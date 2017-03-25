import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from './dashboard.component';
import {NgModule} from '@angular/core';
import {SettingsComponent} from "../settings/settings.component";
import {StatisticsComponent} from "../statistics/statistics.component";
import {ChartResolver} from "../statistics/chart.resorver";

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
      },
      {
        path: 'statistics',
        component: StatisticsComponent,
        resolve: {statistics: ChartResolver}
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
