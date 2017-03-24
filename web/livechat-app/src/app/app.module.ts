import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app.routing.module';
import {LoggedInGuard} from './LoggedInGuard';
import {HomeModule} from './home/home.module';
import {DashboardModule} from './dashboard/dashboard.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  providers : [
    LoggedInGuard
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpModule,
    HomeModule,
    DashboardModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
