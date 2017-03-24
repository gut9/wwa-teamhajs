import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HomeComponent} from './home.component';
import {LoginComponent} from '../login/login.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports : [
    HomeComponent
  ],
  declarations: [
    HomeComponent,
    LoginComponent
  ]
})
export class HomeModule { }
