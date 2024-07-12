import {Component, OnInit} from '@angular/core';
import {PersonService} from "../../services/person.service";
import {Person, PersonParams} from "../../models/person.model";

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrl: './person-list.component.scss'
})
export class PersonListComponent implements OnInit {

  persons: Person[] = [];

  totalRecords!: number;
  page: number = 0;
  first: number = 0
  rows: number = 5;
  totalPages!: number;
  params!: PersonParams;

  loading: boolean = false;

  constructor(private _personService: PersonService) {}

  ngOnInit() {
    this.loading = true;
  }

  loadPersons() {
    this.loading = true;

    setTimeout(() => {
      console.log("call for page : "+this.page);
      console.log("call ROWS : "+this.rows);
      this._personService.getAll(this.params, this.page, this.rows).subscribe({
          next: (res) => {
            console.log(res);
            this.persons = res.content
            this.totalPages = res.totalPages
            this.totalRecords = res.totalElements
            this.loading = false;
          },
          error: (error) => {
            console.log(error)
          },
          complete: () => {
          }
        }
      )
    }, 1000);
  }

  pageChange(event: any){
    this.rows = event.rows
    this.first = event.first
    this.page = event.first / event.rows
    this.loadPersons()
  }

}
