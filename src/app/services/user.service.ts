import { inject, Injectable, signal } from '@angular/core';
import { User } from '../models/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';

const apiUrl = 'http://localhost:8080/api/users';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  private http = inject(HttpClient);
  private jwtHelper = inject(JwtHelperService); 
  
  // Maak een Signal aan voor de lijst van gebruikers
  private usersSignal = signal<User[]>([
    new User(1, 'user1@example.com', ['user']),
    new User(2, 'admin1@example.com', ['admin']),
    new User(3, 'user2@example.com', ['user']),
    new User(4, 'admin2@example.com', ['admin']),
  ]);

  usersDB = signal<User[]>([]);

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return token ? new HttpHeaders().set('Authorization', `Bearer ${token}`) : new HttpHeaders();
  }

  // Deze users() wordt een getter die de lijst van gebruikers beschikbaar stelt
  get users() {
    return this.usersSignal; // Dit geeft de Signal terug, die je in de component kunt gebruiken
  }

  getAllUsers(): void {
    const token = localStorage.getItem('token');
    if (token && !this.jwtHelper.isTokenExpired(token)) {
      const headers = this.getAuthHeaders();
      this.http.get<User[]>(`${apiUrl}/users`, { headers }).subscribe({
        next: (data) => {
          this.usersSignal.set(data);
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
  addUser(user: User): void {
    const currentUsers = this.usersSignal(); // Verkrijg de huidige gebruikerslijst
    this.usersSignal.set([...currentUsers, user]); // Update de lijst met een nieuwe gebruiker
  }

  // Functie om een gebruiker te verwijderen
  removeUser(id: number): void {
    const currentUsers = this.usersSignal(); // Verkrijg de huidige lijst
    this.usersSignal.set(currentUsers.filter(user => user.id !== id)); // Filter de gebruiker en update de lijst
  }
}
