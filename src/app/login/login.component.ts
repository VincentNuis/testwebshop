import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';


@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  @Output() cancel = new EventEmitter<void>();

  username: string = '';
  password: string = '';
  isRegistering = false;
  loginFailed: boolean = false;

  private router = inject(Router);
  private jwtHelper = inject(JwtHelperService); 

  constructor(private authService: AuthService) {}

  toggleRegister() {
    this.isRegistering = !this.isRegistering;
  }

  onRegister() {
    if (this.username && this.password) {
      this.authService.register(this.username, this.password).subscribe({
        next: () => {
          alert('Registratie gelukt!');
          this.isRegistering = false;
          this.username = '';
          this.password = '';
        },
        error: (err) => {
          console.error('Registratie mislukt', err);
          alert('Er ging iets mis bij de registratie.');
        }
      });
    } else {
      alert('Vul alle velden in.');
    }
  }

  onSubmit() {
    this.authService.login(this.username, this.password).subscribe({
      next: (response) => {
        this.loginFailed = false;
        
        // Controleer of de response een token bevat
        const token = response.token; // of whatever jouw backend terugstuurt als het token
        if (token) {
          localStorage.setItem('token', token); // JWT opslaan
          alert('Login succesvol!');
          
          // Navigeren naar admin of home afhankelijk van de gebruiker
          const decodedToken = this.jwtHelper.decodeToken(token);
          if (decodedToken.roles[0].role === 'ADMIN') {
            this.router.navigate(['/admin']);
          } else {
            this.router.navigate(['']);
          }
          
          this.cancel.emit();
        } else {
          this.loginFailed = true;
          console.error('Geen token ontvangen bij login');
        }
      },
      error: (err) => {
        this.loginFailed = true;
        console.error('Login mislukt', err);
      }
    });
  }

  onCancel() {
    this.cancel.emit();
  }
}
