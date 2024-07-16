import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {PagedPersons, PersonParams} from "../models/person.model";
import {IAuth} from "../../auth/models/auth.model";
import {env} from "../../../../env/env";
import {catchError, of, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  constructor(private readonly _client: HttpClient) { }

  getAll(filters: PersonParams, page: number, pageSize: number) {

    let params = new HttpParams()
    params = params.append('page', page)
    params = params.append('pageSize', pageSize);

    if (filters !== undefined){
      params = (filters.birthDateLowerBound === undefined) ? params : params.append('birthDateLowerBound', filters.birthDateLowerBound.toISOString());
      params = (filters.birthDateUpperBound === undefined) ? params : params.append('birthDateUpperBound', filters.birthDateUpperBound.toISOString());
      params = (filters.name === null || filters.name === '') ? params : params.append('name', filters.name);
      params = (filters.firstname === null || filters.firstname === '') ? params : params.append('firstname', filters.firstname);
      params = (filters.nationalRegister === null || filters.nationalRegister === '') ? params : params.append('nationalRegister', filters.nationalRegister);
      params = (filters.birthPlace === null || filters.birthPlace === '') ? params : params.append('birthPlace', filters.birthPlace);
      params = (filters.gender === null || filters.gender === '') ? params : params.append('gender', filters.gender);
    }

    return this._client.get<PagedPersons>(`${env.baseUrl}person`,  { params: params })
  }
}
