import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {AuthRoutingModule, routingAuthComponents} from './auth-routing.module';
import {LoginComponent} from "./login/login.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    LoginComponent,
    routingAuthComponents
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AuthModule { }
