import { Component } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { ComplaintService } from '../../services/complaint.service';
import { ComplaintDetail } from '../../models/complaint-model';

@Component({
  selector: 'app-complaint-details',
  templateUrl: './complaint-details.component.html',
  styleUrl: './complaint-details.component.scss'
})
export class ComplaintDetailsComponent {
  id: number = 0;
  complaint: ComplaintDetail | undefined;

  constructor(
    private readonly _route: ActivatedRoute,
    private readonly _complaintDetailsService: ComplaintService
  ) {}


  ngOnInit(): void {
    this._route.params.subscribe(params =>
      this.id = +params["id"]
    )

    this._complaintDetailsService.getComplaint(this.id)
    .subscribe(complaint => {
      this.complaint = complaint;
    })  
  }  
}
