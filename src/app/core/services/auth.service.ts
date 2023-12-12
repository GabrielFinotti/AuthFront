import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // Variaveis do componente
  private url!: string;

  constructor(private http: HttpClient) {
    this.url = 'http://localhost:3000';
  }

  public sign(payload: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.url}/sign`, payload).pipe(
      map((res) => {
        return console.log(res);
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
}
