import {Component} from '@angular/core';
import {ComplaintService} from "../../services/complaint.service";
import { Complaint, ComplaintParams } from '../../models/complaint-model';
import { Status } from '../../models/complaint-model';
import { Router } from "@angular/router";
import {PDFService} from "../../../../shared/services/pdf.service";

interface complaintLabel{
  value: string,
  label: string
}

@Component({
  selector: 'app-complaint-list',
  templateUrl: './complaint-list.component.html',
  styleUrl: './complaint-list.component.scss'
})
export class ComplaintListComponent {

  complaintStatus: complaintLabel[] = [];
  complaints: Complaint[] = [];
  totalRecords!: number;
  first: number = 0;
  page: number = 0;
  rows: number = 5;
  totalPages!: number;
  loading: boolean = false;
  params: ComplaintParams = {
    fileNumber: '',
    dateLowerBound: undefined,
    dateUpperBound: undefined,
    type: '',
    status: ''
  }

  statusTranslations = {
    [Status.REGISTERED]: "complaint.statusType.registered",
    [Status.IN_PROGRESS]: "complaint.statusType.in_progress",
    [Status.CLOSED]: "complaint.statusType.closed",
  }

  constructor(
    private _complaintService: ComplaintService,
    private _pdfService: PDFService,
    private readonly _router: Router
  ) {}

  ngOnInit() {
    this.loading = true;
    this.complaintStatus = [
      {value: 'REGISTERED', label: 'complaint.statusType.registered'},
      {value: 'IN_PROGRESS', label: 'complaint.statusType.in_progress'},
      {value: 'CLOSED', label: 'complaint.statusType.closed'}
    ]
  }

  loadComplaints() {
    this.loading = true;
    console.log(this.params)

    setTimeout(() => {
      this._complaintService.getAll(this.params, this.page, this.rows).subscribe({
        next: (res) => {
          this.complaints = res.content
          console.log("COMPLAINT : ", this.complaints)
          this.totalPages = res.totalPages
          this.totalRecords = res.totalElements
          this.loading = false;
        },
        error: (error) => {
          console.log(error)
        },
        complete: () => {}
      })
    }, 1000);
  }

  pageChange(event: any) {
    this.rows = event.rows;
    this.first = event.first;
    this.page = event.first / event.rows;
    this.loadComplaints();
  }

  translateStatus(status: Status): string {
    return this.statusTranslations[status] || status;
  }

  viewDetails(id: string): void {
    this._router.navigate(['/complaints', id]);
  }

  printPDF(complaintId: number, fileNumber: string) {
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
