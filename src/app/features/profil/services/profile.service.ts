import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { env } from "../../../../env/env";
import { IPersonDetails } from "../models/person.models";
import { HttpClient } from "@angular/common/http";
import { IAddress } from "../models/address.models";

@Injectable({
    providedIn: 'root'
})


export class ProfileService {

    constructor(private readonly _client: HttpClient) {}
    
    getPersonById(id: number) {
        return this._client.get<IPersonDetails>(env.baseUrl + 'person/' + id + '/details')
    }

    updateProfile(profileData: IPersonDetails): Observable<any> {
        return this._client.put(env.baseUrl + 'person/' + 3, profileData)
    }

    updateAddress(address: IAddress): Observable<any> {
        return this._client.put(env.baseUrl + 'address/' + address.id, address)
    }
}