import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfilRoutingModule } from './profil-routing.module';
import { ProfilDetailComponent } from './components/profil-detail/profil-detail.component';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [
    ProfilDetailComponent
  ],
  imports: [
    CommonModule,
    ProfilRoutingModule,
    TranslateModule
  ]
})
export class ProfilModule { }
