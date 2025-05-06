import { inject, Injectable, signal } from '@angular/core';
import { User } from '../models/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';

const apiUrl = 'http://localhost:8080/api/users';

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
        },
      });
    } else {
      console.log('Token is expired or missing');
    }
  }
  
  // Functie om een nieuwe gebruiker toe te voegen
  addUser(user: User): Observable<any> {
    let adminAddUser = {
      email: user.email,
      password: 'default',
      roles: [{ role: user.roles[0] }]
    }
    return this.http.post(`${apiUrl}/register`, adminAddUser);
  }

  // Functie om een gebruiker te verwijderen
  removeUser(id: number): void {
    const currentUsers = this.usersDB(); // Verkrijg de huidige lijst
    this.usersDB.set(currentUsers.filter(user => user.id !== id)); // Filter de gebruiker en update de lijst
  }

  deleteUser(user: User): Observable<any>{
    const headers = this.getAuthHeaders();
    return this.http.delete(`${apiUrl}/${user.id}`, { headers });
  }
}
