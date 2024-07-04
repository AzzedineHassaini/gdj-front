import {HttpHeaders, HttpInterceptorFn} from "@angular/common/http";
import {AuthService} from "../services/auth.service";
import {inject} from "@angular/core";
import {catchError, tap} from "rxjs";

export const jwtInterceptor: HttpInterceptorFn = (req, next)  => {
  const auth = inject(AuthService)
  const token = auth.token;

  if( token ){
    req = req.clone({
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`
      })
    })
  }

  return next(req).pipe(
    tap(resp => console.log(resp)),
    catchError(
      () => {
        throw 'Interceptor Error'
      }
    )
  )
}
