import { Component, OnInit } from '@angular/core';
import {TodosService} from "./todos.service";
import {Todo} from "./TodoInterface";

@Component({
  selector: 'app-list-todos',
  template: `
    <p *ngFor="let todo of list_of_todos" [ngClass]="{cross: todo.completed}">
      <app-todo [data]="todo" [actions]="{deleteTodo: deleteTodo.bind(this), updateCompleted: updateCompleted.bind(this)}"></app-todo>
    </p>
  `,
  styles: [`
    .cross {text-decoration: line-through;}
  `
  ]
})
export class ListTodosComponent implements OnInit {
  list_of_todos: Array<Todo> = [];
  constructor(private todoService: TodosService) {
    this.todoService.getTodos().subscribe(data => {
      this.list_of_todos = data;
    })
  }

  ngOnInit(): void {
  }

  deleteTodo(todo_id: string) {
    this.todoService.deleteTodoById(todo_id).subscribe(data => {
      this.list_of_todos = this.list_of_todos.filter(todo => todo._id !== todo_id);
    });
  }

  updateCompleted(todo_id: string, completed: boolean) {
    this.todoService.toggleTodoById(todo_id, completed).subscribe(data => {
      this.list_of_todos = this.list_of_todos.map(todo => {
        if (todo._id === todo_id) {
          todo.completed = completed;
        }
        return todo;
      });
    })
  }

}
