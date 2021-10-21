import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { ODSComponent } from './ods.component';
import { TodoStoreService } from './providers/todo-store.service';
import { TodoService } from './providers/todo.service';

export const routes: Routes = [{ path: '', component: ODSComponent }];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    FormsModule,
    HttpClientModule,
    CommonModule,
  ],
  exports: [],
  declarations: [ODSComponent],
  providers: [TodoStoreService, TodoService],
})
export class ODSModule {}
