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
  newUserRole: string = 'user';

  ngOnInit() {
    this.userService.getAllUsers();
  }

  getRoleNames(user: User): string {
    return user.roles.map((r: any) => r.role ?? r).join(', ');
  }

  addUser() {
    const newUser = new User(
      null,
      this.newUserEmail,
      [this.newUserRole])
    this.userService.addUser(newUser).subscribe({
      next: () => {
        alert('Registratie gelukt!');
        this.newUserEmail = '';
        this.newUserRole = 'USER';
        this.userService.getAllUsers();
      },
      error: (err) => {
        console.error('Registratie mislukt', err);
        alert('Er ging iets mis bij de registratie.');
      }
    });;
  }

  removeUser(userId: number) {
    this.userService.removeUser(userId);
  }

  deleteUser(user: User) {
    this.userService.deleteUser(user).subscribe({
      next: () => {
        alert('User deleted successfully');
        this.userService.getAllUsers();
      },
      error: (err) => {
        alert('Error deleting user');
      }
    });
  }
}
