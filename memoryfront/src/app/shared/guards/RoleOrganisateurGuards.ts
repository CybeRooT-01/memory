import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable, Subscribable, of } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { tap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class RoleOrganisateurGuards implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
    const allowedRoles = ["Organisateur d'Événements"];
    return this.authService.getCurrentUser().pipe(
      tap((response: any) => {
        // console.log(response);
      }),
      map((response: any) => {
        const userRoles = response.data.role;
        // console.log(userRoles);
        const hasPermission = allowedRoles.some((role) =>
          userRoles.includes(role)
        );
        if (
          !hasPermission &&
          (state.url === '/create-event' ||
            state.url === '/demande-participation' ||
            state.url==="/prestataires")
        ) {
          this.router.navigate(['/404']);
        }
        return hasPermission;
      })
    );
  }
}
