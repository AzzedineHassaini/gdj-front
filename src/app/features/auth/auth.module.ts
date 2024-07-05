import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './components/login/login.component';
import {ReactiveFormsModule} from "@angular/forms";
import {Button} from "primeng/button";
import {TranslateModule} from "@ngx-translate/core";
import {PasswordModule} from "primeng/password";
import {InputTextModule} from "primeng/inputtext";
import {InputGroupModule} from "primeng/inputgroup";
import {InputGroupAddonModule} from "primeng/inputgroupaddon";


@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    Button,
    TranslateModule,
    PasswordModule,
    InputTextModule,
    InputGroupModule,
    InputGroupAddonModule
  ]
})
export class AuthModule { }
