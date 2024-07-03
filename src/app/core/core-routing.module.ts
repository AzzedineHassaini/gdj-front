import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CoreComponent} from "./containers/core/core.component";
import {HomeComponent} from "./layout/home/home.component";
import { ProfilDetailComponent } from '../features/profil/components/profil-detail/profil-detail.component';

const routes: Routes = [
  {
    path: '',
    component: CoreComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'profil',
        component: ProfilDetailComponent,
      }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoreRoutingModule { }
