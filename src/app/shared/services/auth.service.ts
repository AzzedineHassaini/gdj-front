import { Injectable } from '@angular/core';
import {IAuth} from "../../features/auth/models/auth.model";
import {BehaviorSubject, Observable, tap} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {CookieService} from "ngx-cookie-service";
import {ILoginForm} from "../../features/auth/form/login.form";
import {env} from "../../../env/env";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _currentUser$ = new BehaviorSubject<IAuth | null>(null);

  set currentUser(value: IAuth | null) {
    if (value){
      this._cookie.set("user", btoa(JSON.stringify(value)));
    } else {
      this._cookie.delete("user");
    }
    this._currentUser$.next(value);
  }

  get currentUser(): IAuth | null {
    return this._currentUser$.value;
  }


  constructor(
    private readonly _cookie: CookieService,
    private readonly _client: HttpClient
  ) {

  }

  // - se connecter
  login(form: ILoginForm){

    return this._client.post<IAuth>(env.baseUrl + 'auth/login', form).pipe(
      tap((auth) =>
      {
        this.currentUser = auth
      }));
  }

  // - se déconnecter
  logout(){
    this.currentUser = null;
  }

  // - récupérer l'user connecté
  get currentUser$(): Observable<IAuth | null> {
    return this._currentUser$.asObservable();
  }

}
