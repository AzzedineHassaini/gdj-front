import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./components/login/login.component";
import {RegisterComponent} from "./components/register/register.component";
import { ProfileGuard } from '../profil/guards/profil.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [ProfileGuard]},
  { path: 'register/:role', component: RegisterComponent, canActivate: [ProfileGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
