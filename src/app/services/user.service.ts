import { Injectable, signal } from '@angular/core';
import { User } from '../models/user';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  // Maak een Signal aan voor de lijst van gebruikers
  private usersSignal = signal<User[]>([
    new User(1, 'user1@example.com', ['user']),
    new User(2, 'admin1@example.com', ['admin']),
    new User(3, 'user2@example.com', ['user']),
    new User(4, 'admin2@example.com', ['admin']),
  ]);

  // Deze users() wordt een getter die de lijst van gebruikers beschikbaar stelt
  get users() {
    return this.usersSignal; // Dit geeft de Signal terug, die je in de component kunt gebruiken
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
