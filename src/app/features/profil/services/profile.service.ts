import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { env } from "../../../../env/env";
import { IPersonDetails } from "../models/profile.models";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { IAddress } from "../models/profile.models";

@Injectable({
    providedIn: 'root'
})

export class ProfileService {

    constructor(private readonly _client: HttpClient) {}

    getPersonById(id: number | undefined) {
        if (id === undefined) {
            throw new Error("Id is undefined");
        }

        return this._client.get<IPersonDetails>(env.baseUrl + 'person/' + id + '/details');
    }

    getCurrentPerson(){
      return this._client.get<IPersonDetails>(env.baseUrl + 'person/details')
    }

    updateProfile(profileData: IPersonDetails): Observable<any> {
        return this._client.put(env.baseUrl + 'person/' + profileData.id, profileData);
    }

    updateAddress(address: IAddress): Observable<any> {
        return this._client.put(env.baseUrl + 'address/' + address.id, address);
    }

    uploadFile(file: File): Observable<void> {
        const formData: FormData = new FormData();
        formData.append('file', file, file.name);

        return this._client.post<void>(env.baseUrl + 'image', formData, {
            headers: new HttpHeaders({
                'Accept': 'application/json'
            })
        });
    }
}