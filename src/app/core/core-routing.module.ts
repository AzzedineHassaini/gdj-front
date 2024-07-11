import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./layout/home/home.component";
import {CoreComponent} from "./containers/core/core.component";

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
        path: 'profile',
        loadChildren: () => import ('../features/profil/profile.module').then(m => m.ProfileModule),
      },
      {
        path: 'complaint',
        loadChildren: () => import ('../features/complaints/complaints.module').then(m => m.ComplaintsModule),
      }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoreRoutingModule { }
