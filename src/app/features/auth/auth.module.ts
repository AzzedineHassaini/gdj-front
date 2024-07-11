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
import { RegisterComponent } from './components/register/register.component';
import {InputMaskModule} from "primeng/inputmask";
import {CalendarModule} from "primeng/calendar";
import {DropdownModule} from "primeng/dropdown";
import {FileUploadModule} from "primeng/fileupload";CommonModule


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent
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
    InputGroupAddonModule,
    InputMaskModule,
    CalendarModule,
    DropdownModule,
    FileUploadModule
  ]
})
export class AuthModule { }
