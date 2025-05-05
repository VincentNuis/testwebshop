import { inject } from '@angular/core';
import { CanActivateChildFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const AdminGuard: CanActivateChildFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const user = authService.getCurrentUser();

  if (user?.hasRole('admin')) {
    console.log("Admin!");
    return true;
  } else {
    console.log("no Admin");
    router.navigate(['/']);
    return false;
  }
};