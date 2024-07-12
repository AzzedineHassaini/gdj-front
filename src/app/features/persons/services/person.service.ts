import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {PagedPersons, PersonParams} from "../models/person.model";
import {IAuth} from "../../auth/models/auth.model";
import {env} from "../../../../env/env";
import {catchError, of, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  constructor(private readonly _client: HttpClient) { }

  getAll(params: PersonParams, page: number, pageSize: number) {
    return this._client.get<PagedPersons>(env.baseUrl + 'person')
  }

}
