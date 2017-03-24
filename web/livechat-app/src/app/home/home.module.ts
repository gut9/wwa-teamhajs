import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HomeComponent} from './home.component';
import {LoginComponent} from '../login/login.component';
import {FormsModule} from "@angular/forms";

@NgModule({
  imports: [
    CommonModule, FormsModule
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
