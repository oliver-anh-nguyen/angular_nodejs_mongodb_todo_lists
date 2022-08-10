import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Todo} from "./TodoInterface";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class TodosService {

  constructor(private http: HttpClient) { }

  getTodos() {
    let url = environment.baseUrl + 'todos';
    return this.http.get<Array<Todo>>(url);
  }

  getTodoById(todo_id: string) {
    let url = environment.baseUrl + 'todos/';
    return this.http.get<Todo>(url + todo_id);
  }

  deleteTodoById(todo_id: string) {
    let url = environment.baseUrl + 'todos/';
    return this.http.delete(url+ todo_id);
  }

  toggleTodoById(todo_id: string, completed: boolean) {
    let url = environment.baseUrl + 'todos/';
    return this.http.patch(url + todo_id + '?completed=' + completed, {});
  }

  addNewTodo(todo: Todo) {
    let url = environment.baseUrl + 'todos';
    return this.http.post(url, todo);
  }

  updateTodo(todo: Todo) {
    let url = environment.baseUrl + 'todos/';
    return this.http.put(url + todo._id, todo);
  }
}
