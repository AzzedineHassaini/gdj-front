import {Component, OnInit} from '@angular/core';
import {PersonService} from "../../services/person.service";
import {PagedPersons, Person, PersonParams} from "../../models/person.model";
import {Gender} from "../../../profil/models/profile.models";
import {Router} from "@angular/router";
import {AuthService} from "../../../auth/services/auth.service";
import {UserRole} from "../../../auth/models/auth.model";
import {Observable} from "rxjs";


interface GenderLabel{
  value: string,
  label: string
}

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrl: './person-list.component.scss'
})
export class PersonListComponent implements OnInit {

  persons: Person[] = [];
  totalRecords: number = 0;
  page: number = 0;
  first: number = 0;
  rows: number = 5;
  totalPages!: number;
  params: PersonParams = {
    birthDateLowerBound: undefined,
    birthDateUpperBound: undefined,
    name: '',
    firstname: '',
    nationalRegister: '',
    birthPlace: '',
    gender: ''
  };

  genderOptions: GenderLabel[] = []

  loading: boolean = false;

  constructor(private _personService: PersonService,
              private _authService: AuthService,
              private _router: Router) {}

  ngOnInit() {
    this.loading = true;
    this.genderOptions = [
      {value: 'MALE', label: 'profile.male'},
      {value: 'FEMALE', label: 'profile.female'},
      {value: 'OTHER', label: 'profile.other'}
    ]
  }

  genderTranslations = {
    [Gender.MALE]: "profile.male",
    [Gender.FEMALE]: "profile.female",
    [Gender.OTHER]: "profile.other",
  }

  translateGender(gender: Gender): string {
    return this.genderTranslations[gender] || gender;
  }

  loadPersons() {
    this.loading = true;
    console.log('load persons')

    setTimeout(() => {
      let func: () => Observable<PagedPersons>
      if (this._authService.currentUser?.role === UserRole.AGENT) {
        func = () => this._personService.getAll(this.params, this.page, this.rows)
      } else if (this._authService.currentUser?.role === UserRole.LAWYER) {
        const lawyerId: number = this._authService.currentUser?.personId || 0
        func = () => this._personService.getLawyerClients(lawyerId, this.params, this.page, this.rows)
      } else {
        console.log("Role is not Agent or Lawyer")
        return
      }
      func().subscribe({
          next: (res) => {
            this.persons = res.content
            this.totalPages = res.totalPages
            this.totalRecords = res.totalElements
            this.loading = false;
            console.log('loaded')
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

  viewDetails(id: number) {
    this._router.navigate(['/persons', id])
  }

}
