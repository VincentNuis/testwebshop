import { Component, inject } from '@angular/core';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-users',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './admin-users.component.html',
  styleUrl: './admin-users.component.scss'
})
export class AdminUsersComponent {
  private userService = inject(UserService);

  usersDB = this.userService.usersDB;

  newUserEmail: string = '';
  newUserRole: string = 'USER';

  ngOnInit(): void {
    this.userService.getAllUsers();
  }

  getRoleNames(user: User): string {
    return user.roles.map((role: any) => role.role ?? role).join(', ');
  }

  addUser(): void {
    const newUser = new User(null, this.newUserEmail, [this.newUserRole]);
    this.userService.addUser(newUser).subscribe({
      next: () => {
        alert('User registered successfully!');
        this.newUserEmail = '';
        this.newUserRole = 'USER';
        this.userService.getAllUsers();
      },
      error: (err) => {
        console.error('Error registering user:', err);
        alert('An error occurred while registering the user.');
      }
    });
  }

  deleteUser(user: User): void {
    this.userService.deleteUser(user).subscribe({
      next: () => {
        alert('User deleted successfully!');
        this.userService.getAllUsers();
      },
      error: (err) => {
        console.error('Error deleting user:', err);
        alert('An error occurred while deleting the user.');
      }
    });
  }
}
