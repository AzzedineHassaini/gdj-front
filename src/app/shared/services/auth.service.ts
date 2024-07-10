import { Injectable } from '@angular/core';
import {IAuth} from "../../features/auth/models/auth.model";
import {BehaviorSubject, catchError, map, Observable, of, tap} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {CookieService} from "ngx-cookie-service";
import {ILoginForm} from "../../features/auth/form/login.form";
import { env } from '../../../env/env';
import {IRegisterForm} from "../../features/auth/form/register.form";
import {MessageService} from "primeng/api";
import {TranslateService } from "@ngx-translate/core";

export enum RegisterRole{
  CITIZEN='citizen',
  AGENT='agent',
  ADMIN='admin',
  LAWYER='lawyer'
}

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
    private readonly _client: HttpClient,
    private readonly _message: MessageService,
    private readonly _translate: TranslateService
  ) {
    this.loadUser()
  }

  // - se connecter
  login(form: ILoginForm) {
    return this._client.post<IAuth>(env.baseUrl + 'auth/login', form).pipe(
      tap((auth) => {
        this.currentUser = auth;
        this._message.add({
          severity: 'success',
          summary: 'Auth success',
          detail: this._translate.instant('auth.successfullylogged')
        });
      }),
      catchError((error) => {
        this._message.add({
          severity: 'error',
          summary: 'Auth failed',
          detail: "{{'auth.errorlogged' | translate }}"
        });
        return of(null);
      })
    );
  }
  // - s'enregistrer
  register(form: IRegisterForm, role: RegisterRole){

    return this._client.post<IAuth>(env.baseUrl + 'auth/register/' + role, form).pipe(
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
