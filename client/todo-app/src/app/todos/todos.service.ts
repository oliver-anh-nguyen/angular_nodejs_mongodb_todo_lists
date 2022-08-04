import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Todo} from "./TodoInterface";

@Injectable({
  providedIn: 'root'
})
export class TodosService {

  constructor(private http: HttpClient) { }

  getTodos() {
    return this.http.get<Array<Todo>>('http://localhost:3000/todos');
  }

  getTodoById(todo_id: string) {
    return this.http.get<Todo>('http://localhost:3000/todos/' + todo_id);
  }

  deleteTodoById(todo_id: string) {
    return this.http.delete('http://localhost:3000/todos/'+ todo_id);
  }

  toggleTodoById(todo_id: string, completed: boolean) {
    return this.http.patch('http://localhost:3000/todos/' + todo_id + '?completed=' + completed, {});
  }

  addNewTodo(todo: Todo) {
    return this.http.post('http://localhost:3000/todos', todo);
  }
}
