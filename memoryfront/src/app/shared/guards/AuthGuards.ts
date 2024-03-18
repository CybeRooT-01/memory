import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Observable, catchError, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}
  canActivate(): Observable<boolean> {
  return this.authService.verifyToken().pipe(
      map((response: any) => {
        return true;
      }),
      catchError((error) => {
        this.router.navigate(['/login'], { skipLocationChange: true });
        return of(false);
      })
    );
  }
  // canActivate(): boolean {
  //   if (this.authService.isLoggedIn() || localStorage.getItem('token')) {
  //     return true;
  //   } else {
  //     this.router.navigate(['/login']);
  //     return false;
  //   }
  // }

}
