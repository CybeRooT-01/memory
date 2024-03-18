import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, catchError, switchMap, tap } from 'rxjs';
import { Environnements } from 'src/environements/environnements';
import { LoggedUser, Data } from '../Interfaces/LoggedUser';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authToken: string | null = null;

  constructor(
    private http: HttpClient,
    private router: Router,
    private toastr: ToastrService
  ) { }
  
  update(data: Data) {
    return this.http.put(Environnements.api.baseUrl + '/users', data).pipe(
      tap((response: any) => {
        this.toastr.success('Votre profil a bien été modifié');
        this.router.navigate(['']);
      }),
      catchError((error) => {
        console.log(error);
        this.toastr.error(error.error.message);
        throw error;
      })
    );
  }

  getUserByIdBizzare(id: string): Observable<any> {
    return this.http.get<any>(Environnements.api.baseUrl + '/users/' + id);
  }

  register(data: any) {
    return this.http.post(Environnements.api.baseUrl + '/register', data).pipe(
      tap((response: any) => {
        this.setToken(response.token);
        this.router.navigate(['']);
        // console.log(response);
      }),
      catchError((error) => {
        console.log(error);
        this.toastr.error(error.error.message);
        throw error;
      })
    );
  }

  login(login: string, password: string) {
    return this.http
      .post(Environnements.api.baseUrl + '/login', { login, password })
      .pipe(
        tap((response: any) => {
          this.setToken(response.token);
          this.router.navigate(['']);
          // console.log(response);
        }),
        catchError((error) => {
          console.log(error);
          throw error;
        })
      );
  }

  setToken(token: string) {
    this.authToken = token;
    return localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return !!this.authToken;
  }
  verifyToken(): Observable<boolean> {
    return this.http.get<boolean>(Environnements.api.baseUrl + '/verify-token')
  }

  logout() {
    this.http
      .post(Environnements.api.baseUrl + '/logout', {})
      .pipe(
        switchMap(() => {
          console.log('Déconnexion côté serveur effectuée avec succès !');
          localStorage.removeItem('token');
          this.router.navigate(['/login']);
          return [];
        }),
        catchError((error) => {
          console.log('Erreur lors de la déconnexion côté serveur :', error);
          return [];
        })
      )
      .subscribe(() => {
        this.router.navigate(['/login']);
      });
  }
  getCurrentUser(): Observable<LoggedUser> {
    return this.http.get<LoggedUser>(Environnements.api.baseUrl + '/user');
  }
}
