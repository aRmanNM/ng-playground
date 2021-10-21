import { Component, OnInit } from '@angular/core';
import { Todo } from './interfaces/todo';
import { TodoStoreService } from './providers/todo-store.service';

@Component({
  selector: 'app-ods',
  templateUrl: 'ods.component.html',
})
export class ODSComponent implements OnInit {
  newTodoDesc: string = '';
  todos: Todo[] = [];

  constructor(public todoStore: TodoStoreService) {}

  ngOnInit() {
    this.todoStore.todos$.subscribe((res) => {
      this.todos = res;
    });
  }

  addTodo(): void {
    const todo: Todo = {
      completed: false,
      description: this.newTodoDesc,
      id: this.todos.length,
    };

    this.todoStore.addTodo(todo);
  }

  toggleTodo(todo: Todo): void {
    todo.completed = !todo.completed;
    this.todoStore.toggleTodo(todo);
  }

  removeTodo(todo: Todo): void {
    this.todoStore.deleteTodo(todo);
  }
}
