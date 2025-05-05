import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { User } from '../models/user';

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
  router = inject(Router)

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
      next: (data) => {
        this.loginFailed = false;
        alert('Login Successful!');
        if (this.username === 'admin') {
          this.router.navigate(['/', 'admin']);
        } else {
          this.router.navigate(['/', 'home']);  
        }
        this.cancel.emit();
      },
      error: (err) => {
        this.loginFailed = true;
        console.error('Login failed', err);
      }
    });
    if (this.mockAuthService(this.username, this.password)) {
      alert('Login Successful!');
      this.loginFailed = false;
      if (this.username === "admin") {
        this.router.navigate(['/', 'admin']);
      }
      this.cancel.emit();
    } else {
      this.loginFailed = true;
    }
  }

  private mockAuthService(username: String, password: String): boolean {
    return username === 'admin' && password === 'admin123';  // Example mock check
  }

  onCancel() {
    this.cancel.emit();
  }
}
