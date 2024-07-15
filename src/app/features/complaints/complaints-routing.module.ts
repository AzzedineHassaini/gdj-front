import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ComplaintListComponent} from "./components/complaint-list/complaint-list.component";
import { ComplaintDetailsComponent } from './components/complaint-details/complaint-details.component';

const routes: Routes = [
  {
    path: "", component: ComplaintListComponent
    
  },
  {
    path: ":id", component: ComplaintDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComplaintsRoutingModule { }
