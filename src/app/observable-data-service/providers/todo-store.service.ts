import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { Todo } from '../interfaces/todo';
import { TodoService } from './todo.service';

@Injectable()
export class TodoStoreService {
  private readonly _todos = new BehaviorSubject<Todo[]>([]);
  readonly todos$ = this._todos.asObservable();

  constructor(private todoService: TodoService) {
    this.getTodos();
  }

  getTodos() {
    this.todoService.get().subscribe((res) => {
      this._todos.next(res);
    })
  }

  addTodo(todo: Todo) {
    this.todoService.post(todo).subscribe((res) => {
      this._todos.next(res);
    });
  }

  toggleTodo(todo: Todo) {
    this.todoService.toggle(todo).subscribe((res) => {
      this._todos.next(res);
    });
  }

  deleteTodo(todo: Todo) {
    this.todoService.delete(todo).subscribe((res) => {
      this._todos.next(res);
    });
  }
}
