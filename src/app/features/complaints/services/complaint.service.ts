import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ComplaintParams, PagedComplaints } from '../models/complaint-model';
import { env } from '../../../../env/env';


@Injectable({
  providedIn: 'root'
})
export class ComplaintService {

  constructor(private readonly _client: HttpClient) {}

  getAll(filters: ComplaintParams, page: number, pageSize: number) {

    let params = new HttpParams();
    params = params.append('page', page);
    params = params.append('pageSize', pageSize);

    if (filters !== undefined) {
      params = (filters.dateLowerBound === undefined) ? params : params.append('dateLowerBound', filters.dateLowerBound.toDateString());
      params = (filters.dateUpperBound === undefined) ? params : params.append('dateUpperBound', filters.dateUpperBound.toDateString());
      params = (filters.fileNumber === null) ? params : params.append('fileNumber', filters.fileNumber);
      params = (filters.status === null) ? params : params.append('status', filters.status);
      params = (filters.type === null) ? params : params.append('type', filters.type);
    }

    return this._client.get<PagedComplaints>(`${env.baseUrl}complaint`, { params : params })
  }
}
