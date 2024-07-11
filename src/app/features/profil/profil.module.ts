import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
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
    ReactiveFormsModule,
    TranslateModule
  ]
})
export class ProfilModule { }
