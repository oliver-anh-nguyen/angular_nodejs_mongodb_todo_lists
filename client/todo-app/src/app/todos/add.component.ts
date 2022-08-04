import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {TodosService} from "./todos.service";
import {UserService} from "../user.service";

@Component({
  selector: 'app-add',
  template: `
    <p>
      add new todo!
    </p>
    <form [formGroup]="addForm" (ngSubmit)="addTodo()">
      <input type="text" placeholder="title" formControlName="title">
      <input type="text" placeholder="description" formControlName="description">
      <button type="submit" [disabled]="!addForm.valid">Add</button>
    </form>
  `,
  styles: [
  ]
})
export class AddComponent implements OnInit {
  addForm! : FormGroup
  constructor(private fb: FormBuilder, private service: TodosService, private userService: UserService, private router: Router) {
    this.addForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required]
    })
  }

  ngOnInit(): void {
  }

  addTodo() {
    this.service.addNewTodo({
      ...this.addForm.value,
      completed: false,
      user: {
        user_id: this.userService.getUserState()?.user_id,
        fullname: this.userService.getUserState()?.fullname
      }
    }).subscribe(res => {
      this.router.navigate(['/', 'todos']);
    })
  }

}
