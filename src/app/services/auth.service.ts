import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';

const apiUrl = 'http://20.107.56.65:8080/api/users';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);

  register(email: string, password: string): Observable<any> {
    const user = { email, password };
    return this.http.post(`${apiUrl}/register`, user);
  }

  login(email: string, password: string): Observable<any> {
    const credentials = { email, password };
    return this.http.post(`${apiUrl}/login`, credentials, { withCredentials: true });
  }

  getCurrentUser(): User | null {
    const userJson = localStorage.getItem('currentUser');
    return userJson ? JSON.parse(userJson) as User : null;
  }
}
