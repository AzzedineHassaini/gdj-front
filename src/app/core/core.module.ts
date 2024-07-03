import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreRoutingModule } from './core-routing.module';
import { CoreComponent } from './containers/core/core.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { HomeComponent } from './layout/home/home.component';
import {MenubarModule} from "primeng/menubar";
import {DropdownModule} from "primeng/dropdown";
import {FormsModule} from "@angular/forms";
import { TranslateModule } from '@ngx-translate/core';
import {ButtonDirective} from "primeng/button";


@NgModule({
  declarations: [
    CoreComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    CoreRoutingModule,
    MenubarModule,
    DropdownModule,
    FormsModule,
    TranslateModule,
    ButtonDirective
  ]
})
export class CoreModule { }
