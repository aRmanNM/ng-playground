import { Component, OnInit } from '@angular/core';
import { AuthService } from './providers/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-protected',
  templateUrl: 'protected.component.html',
})
export class ProtectedComponent implements OnInit {
  authenticatedUser: any;
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.authenticatedUser = this.authService.userinfo();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['protected/login'], {
      queryParams: { returnUrl: this.router.url },
    });
  }
}
