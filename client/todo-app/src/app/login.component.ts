import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {UserService} from "./user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  template: `
    <p>Login Views</p>
    <form [formGroup]="loginForm" (ngSubmit)="login()">
      <input type="text" placeholder="email" formControlName="email">
      <input type="text" placeholder="password" formControlName="password">
      <button type="submit">Login</button>
    </form>
  `,
  styles: [
  ]
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['oliver@miu.edu'],
      password: ['123456']
    })
  }

  ngOnInit(): void {
  }

  login(): void {
    this.userService.login(this.loginForm.value.email, this.loginForm.value.password)
      .subscribe(res => {
        console.log(res);
        this.userService.userState$.next(res);
        this.userService.persistState();
        console.log(this.userService.getUserState());
        this.router.navigate(['/', 'todos']);
      });
  }

}
