import { inject, Injectable, signal } from '@angular/core';
import { User } from '../models/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';

const apiUrl = 'https://ipwrc-backend-production.up.railway.app/api/users';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private http = inject(HttpClient);
  private jwtHelper = inject(JwtHelperService);

  usersDB = signal<User[]>([]);

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return token ? new HttpHeaders().set('Authorization', `Bearer ${token}`) : new HttpHeaders();
  }

  getAllUsers(): void {
    const token = localStorage.getItem('token');
    if (token && !this.jwtHelper.isTokenExpired(token)) {
      const headers = this.getAuthHeaders();
      this.http.get<User[]>(`${apiUrl}/users`, { headers }).subscribe({
        next: (data) => {
          this.usersDB.set(data);
        },
        error: (error) => {
          console.error('Error fetching users', error);
        }
      });
    } else {
      console.warn('Token is expired or missing');
    }
  }

  addUser(user: User): Observable<any> {
    const adminAddUser = {
      email: user.email,
      password: 'default',
      roles: [{ role: user.roles[0] }]
    };
    return this.http.post(`${apiUrl}/register`, adminAddUser);
  }

  removeUser(id: number): void {
    const currentUsers = this.usersDB();
    this.usersDB.set(currentUsers.filter(user => user.id !== id));
  }

  deleteUser(user: User): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.delete(`${apiUrl}/${user.id}`, { headers });
  }
}
