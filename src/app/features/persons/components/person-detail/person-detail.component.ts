import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {MessageService} from "primeng/api";
import {PersonService} from "../../services/person.service";
import {Person} from "../../models/person.model";

@Component({
  selector: 'app-person-detail',
  templateUrl: './person-detail.component.html',
  styleUrl: './person-detail.component.scss'
})
export class PersonDetailComponent implements OnInit {


  id!: number;
  person!: Person;

  constructor(
    private readonly _router: Router,
    private readonly _route: ActivatedRoute,
    private readonly _personService: PersonService
  ) { }


  ngOnInit(): void {
    this._route.params.subscribe(params => {
      this.id = params['id'];
    });
  }
}
