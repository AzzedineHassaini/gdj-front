import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PersonsRoutingModule } from './persons-routing.module';
import { PersonListComponent } from './components/person-list/person-list.component';
import {TableModule} from "primeng/table";
import {TranslateModule} from "@ngx-translate/core";


@NgModule({
  declarations: [
    PersonListComponent
  ],
  imports: [
    CommonModule,
    PersonsRoutingModule,
    TableModule,
    TranslateModule
  ]
})
export class PersonsModule { }
