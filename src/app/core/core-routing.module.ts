import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CoreComponent} from "./containers/core/core.component";
import {HomeComponent} from "./layout/home/home.component";

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
        path: 'auth',
        loadChildren: () => import('../features/auth/auth.module').then(m => m.AuthModule),
      },
      {
        path: 'profil',
        loadChildren: () => import ('../features/profil/profil.module').then(m => m.ProfilModule),
      }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoreRoutingModule { }
