import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ValidatorComponent } from './validator.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ValidatorService } from './validator.service';

export const routes: Routes = [{ path: '', component: ValidatorComponent }];

@NgModule({
    imports: [RouterModule.forChild(routes), HttpClientModule, CommonModule, ReactiveFormsModule],
    exports: [],
    declarations: [ValidatorComponent],
    providers: [ValidatorService],
})
export class ValidatorModule { }
