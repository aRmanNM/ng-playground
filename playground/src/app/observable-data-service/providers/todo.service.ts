import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Todo } from '../interfaces/todo';
import { Observable, of } from 'rxjs';
import { ODSModule } from '../ods.module';

@Injectable()
export class TodoService {
  constructor(private httpClient: HttpClient) {}

  private _todos: Todo[] = [
    {
      id: 0,
      completed: false,
      description: 'something i have to do',
    },
    {
      id: 1,
      completed: true,
      description: 'something i did',
    },
  ];

  get(): Observable<Todo[]> {
    // replace with http request
    return of(this._todos);
  }

  post(todo: Todo): Observable<Todo[]> {
    // replace with http request
    this._todos.push(todo);
    return of(this._todos);
  }

  delete(todo: Todo): Observable<Todo[]> {
    // replace with http request
    const index = this._todos.indexOf(todo);
    this._todos = this._todos.slice(index, 1);
    return of(this._todos);
  }

  toggle(todo: Todo): Observable<Todo[]> {
    // replace with http request
    this._todos.filter((t) => t.id === todo.id)[0].completed ===
      !this._todos.filter((t) => t.id === todo.id)[0].completed;

    return of(this._todos);
  }
}
