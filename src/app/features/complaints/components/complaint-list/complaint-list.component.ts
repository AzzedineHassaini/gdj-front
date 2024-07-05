import {Component, computed, inject} from '@angular/core';
import {ComplaintService} from "../../services/complaint.service";
import {toSignal} from "@angular/core/rxjs-interop";
import {delay} from "rxjs";

@Component({
  selector: 'app-complaint-list',
  templateUrl: './complaint-list.component.html',
  styleUrl: './complaint-list.component.scss'
})
export class ComplaintListComponent {


  private readonly $complaints = inject( ComplaintService )

  complaints = toSignal( this.$complaints.getComplaints().pipe(delay(2000)) )

  loading = computed(() => {
    const complaints = this.complaints()
    return !complaints
  })

}
