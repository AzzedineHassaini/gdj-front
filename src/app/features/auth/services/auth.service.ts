import { Injectable } from '@angular/core';
import { IAuth } from '../models/auth.model';
import { BehaviorSubject, catchError, map, Observable, of, tap } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { CookieService } from "ngx-cookie-service";
import { ILoginForm } from '../form/login.form';
import { env } from '../../../../env/env';
import { IRegisterForm } from '../form/register.form';
import { MessageService } from "primeng/api";
import { TranslateService } from "@ngx-translate/core";

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
          summary: this._translate.instant('auth.titleloggedsuccess'),
          detail: this._translate.instant('auth.successfullylogged')
        });
      }),
      catchError(() => {
        this._message.add({
          severity: 'error',
          summary: this._translate.instant('auth.titleloggederror'),
          detail: this._translate.instant('auth.errorlogged')
        });
        return of(null);
      })
    );
  }

  // - s'enregistrer
  register(form: IRegisterForm, role: string, login: boolean = true){

    return this._client.post<IAuth>(env.baseUrl + 'auth/register/' + role, form).pipe(
      tap((auth) =>
      {
        if (login) {
          this.currentUser = auth
        }
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
