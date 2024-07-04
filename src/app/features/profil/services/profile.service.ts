import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../../../env/env";
import { IPersonDetails } from "../models/person.model";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})


export class ProfileService {

    constructor(private readonly _client: HttpClient) {}
    
    getPersonById(id: number) {
        return this._client.get<IPersonDetails>(environment.baseUrl + 'person/' + id + '/details')
    }
}