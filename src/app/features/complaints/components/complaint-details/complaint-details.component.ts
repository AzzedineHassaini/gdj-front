import { Component } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { ComplaintService } from '../../services/complaint.service';
import { ComplaintDetail } from '../../models/complaint-model';
import {PDFService} from "../../../../shared/services/pdf.service";

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
    private readonly _complaintDetailsService: ComplaintService,
    private readonly  _pdfService: PDFService
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

  printPDF(complaintId: number, fileNumber: string | undefined) {
    this._pdfService.getComplaintPDF(complaintId).subscribe((data) => {
      let blob = new Blob([data], {type: 'application/pdf'});
      var dowloadURL = window.URL.createObjectURL(data);
      var link = document.createElement('a');
      link.href = dowloadURL;
      link.download = fileNumber+".pdf";
      link.click();
    })
  }
}
