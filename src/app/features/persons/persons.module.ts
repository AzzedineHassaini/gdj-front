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


@NgModule({
  declarations: [
    PersonListComponent
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
    InputMaskModule
  ]
})
export class PersonsModule { }
