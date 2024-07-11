import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfilDetailComponent } from './components/profil-detail/profil-detail.component';
import { profilResolverFn } from './resolvers/profil.resolver';

const routes: Routes = [
  {
    path: "", 
    component: ProfilDetailComponent,
    resolve: [
      profilResolverFn
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfilRoutingModule { }
