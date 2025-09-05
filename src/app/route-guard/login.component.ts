import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from './providers/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
})
export class LoginComponent implements OnInit {
  error: any;
  loginForm = new FormGroup({
    username: new FormControl(),
    password: new FormControl(),
  });

  constructor(
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {}

  login(): any {
    this.error = '';
    this.authService
      .login(this.loginForm.value.username, this.loginForm.value.password)
      .subscribe(
        (res) => {
          this.router.navigate(['./protected']);
        },
        (error) => {
          this.loginForm.reset();
          this.error = 'login failed';
        }
      );
  }

  clearError() {
    this.error = "";
  }
}
