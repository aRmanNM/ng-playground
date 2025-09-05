import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from './providers/auth.service';

export const PasswordGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  const isAuthenticated = authService.isAuthenticated();
  if (isAuthenticated.status === true) {
    return true;
  }

  router.navigate(['protected/login'], {
    queryParams: { returnUrl: state.url },
  });
  return false;
};
