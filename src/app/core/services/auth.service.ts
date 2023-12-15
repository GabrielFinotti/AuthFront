import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, map, throwError } from 'rxjs';

// Serviços
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // Variaveis do componente
  private url!: string;

  constructor(private http: HttpClient, private router: Router) {
    this.url = 'http://localhost:3000';
  }

  public sign(payload: { email: string; password: string }): Observable<any> {
    return this.http.post<{ token: string }>(`${this.url}/sign`, payload).pipe(
      map((res) => {
        localStorage.removeItem('access_token');
        localStorage.setItem('access_token', res.token);
        this.router.navigate(['admin']);
      }),
      catchError((err) => {
        if (err.error.message) {
          return throwError(() => err.error.message);
        } else {
          return throwError(
            () => 'No momento estamos fora do ar, tente novamente mais tarde'
          );
        }
      })
    );
  }

  public logout() {
    localStorage.removeItem('access_token');

    return this.router.navigate(['']);
  }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('access_token')

    if(!token) {
      return false
    } else {
      const jwtHelper = new JwtHelperService();
      return !jwtHelper.isTokenExpired(token);
    }
  }
}
