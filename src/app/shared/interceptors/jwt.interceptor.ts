
import {AuthService} from "../services/auth.service";
import {inject} from "@angular/core";
import {HttpHandlerFn, HttpHeaders, HttpRequest} from "@angular/common/http";

export function authInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn) {
  // Inject the current `AuthService` and use it to get an authentication token:
  const auth$ = inject(AuthService);
  const token = auth$.token;
  // Clone the request to add the authentication header.
  const newReq = req.clone(
    {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`
      })
    });
  console.log("Old req : "+req.headers.getAll("Authorization"))
  console.log("----------------")
  console.log("New req : "+newReq.headers.getAll("Authorization"))
  return next(newReq);
}

// @Injectable()
// export class AuthInterceptor implements HttpInterceptor {
//
//   intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//     const auth = inject(AuthService)
//     const token = auth.token;
//     const authReq = req.clone({
//       setHeaders: {
//         Authorization: `Bearer ${token}`
//       }
//     });
//
//     console.log("Header intercepted")
//     console.log(req);
//     return next.handle(authReq);
//   }
// }

