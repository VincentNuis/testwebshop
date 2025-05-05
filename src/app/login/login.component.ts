import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

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
  loginFailed: boolean = false;
  router = inject(Router)

  constructor(private authService: AuthService) {}

  onSubmit() {
    this.authService.login(this.username, this.password).subscribe({
      next: (data) => {
        // If login is successful, reset loginFailed and navigate
        this.loginFailed = false;
        alert('Login Successful!');
        if (this.username === 'admin') {
          this.router.navigate(['/', 'admin']);
        } else {
          this.router.navigate(['/', 'home']);  // Or wherever the user should go
        }
      },
      error: (err) => {
        // If login fails, set loginFailed to true
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
    } else {
      this.loginFailed = true;
    }
  }

  private mockAuthService(username: string, password: string): boolean {
    return username === 'admin' && password === 'admin123';  // Example mock check
  }

  onCancel() {
    this.cancel.emit();
  }
}
