import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ComplaintListComponent} from "./components/complaint-list/complaint-list.component";

const routes: Routes = [
  {
    path: "", component: ComplaintListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComplaintsRoutingModule { }
