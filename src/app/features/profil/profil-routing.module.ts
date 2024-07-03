import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfilDetailComponent } from './components/profil-detail/profil-detail.component';

const routes: Routes = [
  {
    path: "", component: ProfilDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfilRoutingModule { }
