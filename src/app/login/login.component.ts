import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

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

  onSubmit() {
    // Implement your login logic here
    if (this.mockAuthService(this.username, this.password)) {
      alert('Login Successful!');
      this.loginFailed = false;
      if (this.username === "admin") {
        this.router.navigate(['/', 'admin']);
      }
    } else {
      this.loginFailed = true;
    }
    
    // Add authentication logic and navigate to the next page upon successful login
  }

  private mockAuthService(username: string, password: string): boolean {
    return username === 'admin' && password === 'admin123';  // Example mock check
  }

  onCancel() {
    this.cancel.emit();
  }
}
