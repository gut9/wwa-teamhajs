import {Route} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {LoggedInGuard} from './LoggedInGuard';
export const routes: Route[] = [
  {path: '', component: HomeComponent},
  // {path: 'dashboard', component: DashboardComponent, canActivate: [LoggedInGuard]},
  {path: 'dashboard', loadChildren: 'app/dashboard/dashboard.module#DashboardModule'},
  // {path: 'contactForm', component: ContactComponent},
  // {path: 'contactForm-two', component: ContactTwoComponent},
  // {path: '**', component: PageNotFoundComponent}

];
