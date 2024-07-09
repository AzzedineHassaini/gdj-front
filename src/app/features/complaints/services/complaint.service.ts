import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {env} from "../../../../env/env";
import {IComplaintDetail, IComplaintList} from "../models/complaint-model";

@Injectable({
  providedIn: 'root'
})
export class ComplaintService {

  constructor(
    private readonly _client: HttpClient,
  ) { }

  getComplaints(): Observable<IComplaintList[]> {
    return this._client.get<IComplaintList[]>(env.baseUrl+'complaint')
  }

  getComplaintById(id: number) {
    return this._client.get<IComplaintDetail>(env.baseUrl+'complaint/'+id)
  }
}
