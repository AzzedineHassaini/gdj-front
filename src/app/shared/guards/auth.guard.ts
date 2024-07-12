import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../../features/auth/services/auth.service';
import { firstValueFrom, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {
  constructor (
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
      return this.authService.isConnected$.pipe(
        map((isLogged: any) => {
          const userRole = this.authService.currentUser?.role;
          const isRegisterRoute = /^\/auth\/register\/(citizen|agent|lawyer|admin)$/.test(state.url);

          if (state.url === '/auth/login' && isLogged) {
            this.router.navigate(['/home']);
            return false;
          }

          if (isRegisterRoute && isLogged && userRole !== 'ADMIN') {
            this.router.navigate(['/home']);
            return false;
          }
          return true;
        })
      )
  }
};

