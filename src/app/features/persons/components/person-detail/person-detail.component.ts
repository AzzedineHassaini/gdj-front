import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {PersonService} from "../../services/person.service";
import {ComplaintService} from "../../../complaints/services/complaint.service";
import {Complaint, ComplaintParams} from "../../../complaints/models/complaint-model";
import {IPersonDetails} from "../../../profil/models/profile.models";
import {PDFService} from "../../../../shared/services/pdf.service";

@Component({
  selector: 'app-person-detail',
  templateUrl: './person-detail.component.html',
  styleUrl: './person-detail.component.scss'
})
export class PersonDetailComponent implements OnInit {


  id!: number;
  person!: IPersonDetails;
  complaints!: Complaint[]

  params!: ComplaintParams
  loading: boolean = false;

  responsiveOptions: any[] | undefined

  constructor(
    private readonly _router: Router,
    private readonly _route: ActivatedRoute,
    private readonly _personService: PersonService,
    private readonly _complaintService: ComplaintService,
    private readonly _pdfService: PDFService
  ) { }


  ngOnInit(): void {
    this._route.params.subscribe(params => {
      this.id = params['id'];
    });
    console.log("ID = "+this.id)
    this.loading = true
    this.getPerson()
    this.getComplaints()

    this.responsiveOptions = [
      {
        breakpoint: '1199px',
        numVisible: 5,
        numScroll: 1
      },
      {
        breakpoint: '991px',
        numVisible: 3,
        numScroll: 1
      },
      {
        breakpoint: '767px',
        numVisible: 2,
        numScroll: 1
      }
    ];

  }

  getPerson(){
    setTimeout(() => {
      this._personService.getPersonDetail(this.id).subscribe({
          next: (res) => {
            this.person = res
          },
          error: (error) => {
            console.log(error)
          },
          complete: () => {
            console.log(this.person)
          }
        }
      )
    }, 1000);
  }

  getComplaints() {
    setTimeout(() => {
      this._complaintService.getForCitizen(this.id, this.params, 0, 10).subscribe({
          next: (res) => {
            this.complaints = res.content
            this.loading = false;
            console.log('loaded')
          },
          error: (error) => {
            console.log(error)
          },
          complete: () => {
            console.log(this.complaints)
          }
        }
      )
    }, 1000);
  }

  getSeverity(status: string) {
    switch (status) {
      case 'REGISTERED':
        return 'success';
      case 'IN_PROGRESS':
        return 'warning';
      case 'CLOSED':
        return 'danger';
      default:
        return 'success';
    }
  }

  printPDF(complaintId: number, fileNumber: string){
    this._pdfService.getComplaintPDF(complaintId).subscribe((data) => {

      console.log(data)
      let blob = new Blob([data], {type: 'application/pdf'});

      var downloadURL = window.URL.createObjectURL(data);
      var link = document.createElement('a');
      link.href = downloadURL;
      link.download = fileNumber+".pdf";
      link.click();

    });
  }

  viewDetails(complaintId: number){
    this._router.navigate(['complaints', complaintId]);
  }

}
