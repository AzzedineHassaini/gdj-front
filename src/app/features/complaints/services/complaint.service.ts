import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ComplaintDetail, ComplaintParams, PagedComplaints } from '../models/complaint-model';
import { env } from '../../../../env/env';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ComplaintService {

  constructor(private readonly _client: HttpClient) {}

  getAll(filters: ComplaintParams, page: number, pageSize: number) {

    let params = new HttpParams();
    params = params.append('page', page);
    params = params.append('pageSize', pageSize);
    console.log("Filter : ", filters);
    if (filters !== undefined) {
      params = (filters.dateLowerBound === undefined) ? params : params.append('dateLowerBound', filters.dateLowerBound.toISOString());
      params = (filters.dateUpperBound === undefined) ? params : params.append('dateUpperBound', filters.dateUpperBound.toISOString());
      params = (filters.fileNumber === null) ? params : params.append('fileNumber', filters.fileNumber);
      params = (filters.status === null) ? params : params.append('status', filters.status);
    }
    console.log("Params : ", params);
    return this._client.get<PagedComplaints>(`${env.baseUrl}complaint`, { params : params })
  }

  getComplaint(id: number): Observable<ComplaintDetail> {
    return this._client.get<ComplaintDetail>(`${env.baseUrl}complaint/${id}`);
  }
}
