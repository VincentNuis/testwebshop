import { inject } from '@angular/core';
import { CanActivateChildFn, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

export const AdminGuard: CanActivateChildFn = () => {
  const router = inject(Router);
  const jwtHelper = inject(JwtHelperService);

  const token = localStorage.getItem('token');

  if (token) {
    const decodedToken = jwtHelper.decodeToken(token);
    const isTokenExpired = jwtHelper.isTokenExpired(token);

    if (isTokenExpired) {
      router.navigate(['/login']);
      return false;
    }

    const roles = decodedToken.roles;
    if (roles && Array.isArray(roles)) {
      const isAdmin = roles.some((role: { role: string }) => role.role === 'ADMIN');
      if (isAdmin) {
        return true;
      }
    }
  }

  router.navigate(['/']);
  return false;
};
