import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ComplaintsRoutingModule } from './complaints-routing.module';
import { ComplaintListComponent } from './components/complaint-list/complaint-list.component';
import {ProgressSpinnerModule} from "primeng/progressspinner";
import {TableModule} from "primeng/table";
import { CustomDateFormatPipe } from './pipes/custom-date-format.pipe';
import { ButtonModule } from 'primeng/button';
import { ComplaintDetailsComponent } from './components/complaint-details/complaint-details.component';


@NgModule({
  declarations: [
    ComplaintListComponent,
    CustomDateFormatPipe,
    ComplaintDetailsComponent
  ],
  exports: [
    CustomDateFormatPipe
  ],
  imports: [
    CommonModule,
    ButtonModule,
    ComplaintsRoutingModule,
    ProgressSpinnerModule,
    TableModule,
    TranslateModule
  ]
})
export class ComplaintsModule { }
