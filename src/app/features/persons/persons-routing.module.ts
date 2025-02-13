import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PersonListComponent} from "./components/person-list/person-list.component";
import {PersonDetailComponent} from "./components/person-detail/person-detail.component";

const routes: Routes = [
  {
    path: "",
    component: PersonListComponent
  },
  {
    path: ":id",
    component: PersonDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PersonsRoutingModule { }
