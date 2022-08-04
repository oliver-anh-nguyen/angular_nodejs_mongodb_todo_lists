import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {TodosService} from "./todos.service";
import {UserService} from "../user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Todo} from "./TodoInterface";
import {mergeMap} from "rxjs";

@Component({
  selector: 'app-edit',
  template: `
    <p>
      edit todo!
    </p>
    <form [formGroup]="editForm" (ngSubmit)="editTodo()">
      <input type="text" placeholder="title" formControlName="title">
      <input type="text" placeholder="description" formControlName="description">
      <button type="submit" [disabled]="!editForm.valid">Save</button>
    </form>
  `,
  styles: []
})
export class EditComponent implements OnInit {
  todo!: Todo;
  editForm!: FormGroup

  constructor(private fb: FormBuilder,
              private service: TodosService,
              private userService: UserService,
              private ar: ActivatedRoute,
              private router: Router) {
    this.ar.paramMap
      .pipe(
        mergeMap((params: any) => this.service.getTodoById(params.get('todo_id')))
      ).subscribe(res => {
      console.log(res);
      this.todo = res;
      this.editForm.get('title')?.patchValue(this.todo.title);
      this.editForm.get('description')?.patchValue(this.todo.description);
    })

    this.editForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required]
    })
  }

  ngOnInit(): void {
  }

  editTodo() {
    this.service.updateTodo({
      ...this.todo,
      ...this.editForm.value,
    }).subscribe(res => {
      this.router.navigate(['/', 'todos']);
    })
  }
}
