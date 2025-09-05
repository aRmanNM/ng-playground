import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { jwtDecode } from 'jwt-decode';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private httpClient: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    return this.httpClient
      .post('/api/token', {
        username,
        password,
      })
      .pipe(
        map((res: any) => {
          localStorage.setItem('token', res.token);
        })
      );
  }

  userinfo() {
    const token = localStorage.getItem('token');
    if (token != null) {
      return jwtDecode(token);
    } else {
      return {};
    }
  }

  isAuthenticated() {
    const token = localStorage.getItem('token');
    if (token != null) {
      const decodedToken: any = jwtDecode(token);
      if (
        decodedToken.exp &&
        decodedToken.exp > Math.floor(Date.now() / 1000)
      ) {
        return { status: true, username: decodedToken.name };
      } else {
        return { status: false };
      }
    } else {
      return { status: false };
    }
  }

  logout() {
    localStorage.removeItem('token');
  }
}
