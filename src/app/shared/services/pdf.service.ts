import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {PagedComplaints} from "../../features/complaints/models/complaint-model";
import {env} from "../../../env/env";

@Injectable({
  providedIn: 'root'
})
export class PDFService {

  constructor(private readonly _client: HttpClient) {}

  getComplaintPDF(complaintId: number){

    const httpOptions = {
      responseType: 'blob' as 'json'
    };

    return this._client.get<Blob>(`${env.baseUrl}complaint/${complaintId}/generate-pdf`, httpOptions)
  }

}
