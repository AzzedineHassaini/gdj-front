import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PersonsRoutingModule } from './persons-routing.module';
import { PersonListComponent } from './components/person-list/person-list.component';
import {TableModule} from "primeng/table";
import {TranslateModule} from "@ngx-translate/core";
import {CalendarModule} from "primeng/calendar";
import {InputGroupModule} from "primeng/inputgroup";
import {PaginatorModule} from "primeng/paginator";
import {ReactiveFormsModule} from "@angular/forms";
import {InputTextModule} from "primeng/inputtext";
import {InputMaskModule} from "primeng/inputmask";
import {ComplaintsModule} from "../complaints/complaints.module";
import { PersonDetailComponent } from './components/person-detail/person-detail.component';


@NgModule({
  declarations: [
    PersonListComponent,
    PersonDetailComponent
  ],
  imports: [
    CommonModule,
    PersonsRoutingModule,
    TableModule,
    TranslateModule,
    CalendarModule,
    InputGroupModule,
    PaginatorModule,
    ReactiveFormsModule,
    InputTextModule,
    InputMaskModule,
    ComplaintsModule
  ]
})
export class PersonsModule { }
