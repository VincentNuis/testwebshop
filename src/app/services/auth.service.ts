import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';
import { User } from '../models/user';

const apiUrl = 'http://localhost:8080/api/users';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  
  private http = inject(HttpClient);

  register(email: string, password: string ): Observable<any> {
    let user = {
      email: email,
      password: password
    }
    return this.http.post(`${apiUrl}/register`, user);
  }

  login(email: string, password: string ): Observable<any> {
    let credentials = {
      email: email,
      password: password
    }
    return this.http.post(`${apiUrl}/login`, credentials, { withCredentials: true });
  }

  getCurrentUser(): User | null {
    const userJson = localStorage.getItem('currentUser');
    return userJson ? JSON.parse(userJson) as User : null;
  }

//   private currentUserSubject: BehaviorSubject<any>;
//   public currentUser: Observable<any>;

//   constructor(private http: HttpClient) {
//     // Try to get the token from local storage and set the current user
//     const user = localStorage.getItem('currentUser');
//     this.currentUserSubject = new BehaviorSubject<any>(user ? JSON.parse(user) : null);
//     this.currentUser = this.currentUserSubject.asObservable();
//   }

//   // auth.service.ts
// register(email: String, password: String) {
//   const user = {email, password};
//   // Mock-versie – in een echte app stuur je dit via HTTP naar een backend
//   localStorage.setItem('registeredUser', JSON.stringify(user));
//   return of({ success: true }); // Of gebruik een echte HttpClient POST-call
// }


//   // Get current logged-in user
//   public get currentUserValue() {
//     return this.currentUserSubject.value;
//   }

//   // Login user with username and password
//   login(email: String, password: String): Observable<any> {
//     const savedUser = JSON.parse(localStorage.getItem('registeredUser') || '{}');

//   if (email === savedUser.email && password === savedUser.password) {
//     localStorage.setItem('currentUser', JSON.stringify({ email }));
//     return of({ success: true });
//   } else {
//     return throwError(() => new Error('Ongeldige inloggegevens'));
//   }
//     // Assuming you're sending the credentials in a POST request
//     // return this.http.post<any>(this.apiUrl, { username, password });
//   }

//   // Logout the user
//   logout() {
//     // Remove user from local storage and set current user to null
//     localStorage.removeItem('currentUser');
//     this.currentUserSubject.next(null);
//   }

//   // Check if the user is logged in (has a JWT token)
//   isLoggedIn(): boolean {
//     return !!localStorage.getItem('currentUser');
//   }

  

//   // Get the authorization header with the JWT token
//   private getAuthHeaders() {
//     const user = this.currentUserValue;
//     if (user && user.token) {
//       return new HttpHeaders().set('Authorization', 'Bearer ' + user.token);
//     }
//     return new HttpHeaders();
//   }

//   // Example of making a GET request with authentication
//   getItems(): Observable<any> {
//     return this.http.get(`${this.apiUrl}/items`, { headers: this.getAuthHeaders() });
//   }

//   // Example of making a POST request with authentication
//   addItem(item: any): Observable<any> {
//     return this.http.post(`${this.apiUrl}/addItem`, item, {
//       headers: this.getAuthHeaders(),
//     });
//   }
}
