import { Component, inject } from '@angular/core';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-users',
  imports: [FormsModule],
  templateUrl: './admin-users.component.html',
  styleUrl: './admin-users.component.scss'
})
export class AdminUsersComponent {
   private userService = inject(UserService);
  
   usersSignal = this.userService.users;
 
   newUserEmail: string = '';
   newUserRole: string = 'user';
 
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
