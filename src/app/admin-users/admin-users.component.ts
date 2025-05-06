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
   usersSignal = this.userService.users;
 
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
       this.usersSignal().length + 1, 
       this.newUserEmail,
       [this.newUserRole]
     );
     this.userService.addUser(newUser);
     this.newUserEmail = ''; 
     this.newUserRole = 'user';
   }
 
   removeUser(userId: number) {
     this.userService.removeUser(userId);
   }
}
