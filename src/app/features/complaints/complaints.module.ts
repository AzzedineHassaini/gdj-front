import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComplaintsRoutingModule } from './complaints-routing.module';
import { ComplaintListComponent } from './components/complaint-list/complaint-list.component';
import {ProgressSpinnerModule} from "primeng/progressspinner";
import {TableModule} from "primeng/table";


@NgModule({
  declarations: [
    ComplaintListComponent
  ],
  imports: [
    CommonModule,
    ComplaintsRoutingModule,
    ProgressSpinnerModule,
    TableModule
  ]
})
export class ComplaintsModule { }
