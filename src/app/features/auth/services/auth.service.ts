import { Injectable } from '@angular/core';
import {IAuth} from "../../features/auth/models/auth.model";
import {BehaviorSubject, map, Observable, tap} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {CookieService} from "ngx-cookie-service";
import {ILoginForm} from "../../features/auth/form/login.form";
import { env } from '../../../env/env';
import {IRegisterForm} from "../../features/auth/form/register.form";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _currentUser$ = new BehaviorSubject<IAuth | undefined>(undefined);

  set currentUser(value: IAuth | undefined) {
    if (value){
      this._cookie.set("user", btoa(JSON.stringify(value)));
    } else {
      this._cookie.delete("user");
    }
    this._currentUser$.next(value);
  }

  get currentUser(): IAuth | undefined {
    return this._currentUser$.value;
  }

  get isConnected$(): Observable<boolean> {
    return this.currentUser$.pipe(
      map( auth => !!auth )
    )
  }

  get token(): string | null {
    return this.currentUser ? this.currentUser.token : null
  }

  constructor(
    private readonly _cookie: CookieService,
    private readonly _client: HttpClient
  ) {
    this.loadUser()
  }

  // - se connecter
  login(form: ILoginForm){

    return this._client.post<IAuth>(env.baseUrl + 'auth/login', form).pipe(
      tap((auth) =>
      {
        this.currentUser = auth
      })
    );
  }

  // - s'enregistrer
  register(form: IRegisterForm){

    return this._client.post<IAuth>(env.baseUrl + 'auth/register', form).pipe(
      tap((auth) =>
      {
        this.currentUser = auth
      })
    )

  }

  // - se déconnecter
  logout(){
    this.currentUser = undefined;
  }

  // - récupérer l'user connecté
  get currentUser$(): Observable<IAuth | undefined> {
    return this._currentUser$.asObservable();
  }

  loadUser(){
    const userCookie = this._cookie.get("user");
    if( userCookie ){
      this.currentUser = JSON.parse( atob(userCookie) )
    }
  }

}
