import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileDetailComponent } from './components/profile-detail/profile-detail.component';
import { profileResolverFn } from './resolvers/profile.resolver';

const routes: Routes = [
  {
    path: "", 
    component: ProfileDetailComponent,
    resolve: [
      profileResolverFn
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
