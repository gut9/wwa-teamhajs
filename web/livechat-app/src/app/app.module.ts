import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {AppRoutingModule} from './app.routing.module';
import {LoggedInGuard} from './LoggedInGuard';
import {HomeModule} from './home/home.module';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent
  ],
  providers : [
    LoggedInGuard
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpModule,
    HomeModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
