import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreRoutingModule } from './core-routing.module';
import { CoreComponent } from './containers/core/core.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { HomeComponent } from './layout/home/home.component';
import { MenubarModule } from "primeng/menubar";
import { AvatarModule } from 'primeng/avatar';
import { BadgeModule } from 'primeng/badge';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from "primeng/dropdown";
import { ButtonModule } from 'primeng/button';
import { FormsModule } from "@angular/forms";
import { TranslateModule } from '@ngx-translate/core';
import { ThemeService } from './services/theme.service';
import { Button, ButtonDirective } from "primeng/button";
import { ToastModule } from "primeng/toast";


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
    AvatarModule,
    BadgeModule,
    DialogModule,
    ButtonModule,
    ButtonDirective,
    Button,
    ToastModule
  ],
  providers: [
    ThemeService
  ]
})
export class CoreModule { }
