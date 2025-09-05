import { NgModule } from '@angular/core';

import { ProtectedComponent } from './protected.component';
import { AuthService } from './providers/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login.component';
import { PasswordGuard } from './password.guard';
import { ReactiveFormsModule } from '@angular/forms';

export const routes: Routes = [
  { path: '', component: ProtectedComponent, canActivate: [PasswordGuard] },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes), HttpClientModule, CommonModule, ReactiveFormsModule],
  exports: [],
  declarations: [ProtectedComponent, LoginComponent],
  providers: [AuthService],
})
export class ProtectedModule {}
