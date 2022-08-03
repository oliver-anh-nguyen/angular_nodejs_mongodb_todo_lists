import {Component, Input, OnInit} from '@angular/core';
import {Todo} from "./TodoInterface";

@Component({
  selector: 'app-todo',
  template: `
    <div [setBackground]="todo.completed? 'grey' : ''">{{todo.title}} - {{todo.description}} - {{todo.timestamp | date:'long'}}</div>
    <button (click)="actions.deleteTodo($any(todo)._id)">Delete</button>
    <button (click)="actions.updateCompleted($any(todo)._id, true)" *ngIf="!todo.completed">Mark As Completed</button>
    <button (click)="actions.updateCompleted($any(todo)._id, false)" *ngIf="todo.completed">Mark InCompleted</button>
  `,
  styles: [
  ]
})
export class TodoComponent implements OnInit {
  @Input('data') todo!: Todo;
  @Input() actions!:any;
  constructor() { }

  ngOnInit(): void {
  }

}
