import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {UserService} from "./user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  template: `
    <mat-card>
      <mat-card-title>User Login</mat-card-title>
      <mat-card-content>
        <form [formGroup]="loginForm" (ngSubmit)="login()">
          <mat-form-field class="example-full-width" appearance="fill">
            <mat-label>Email</mat-label>
            <input matInput placeholder="Email" formControlName="email">
          </mat-form-field>

          <mat-form-field class="example-full-width" appearance="fill">
            <mat-label>Password</mat-label>
            <input matInput type="password" placeholder="Password" formControlName="password">
          </mat-form-field>
          <button mat-raised-button color="primary" type="submit">Login</button>
        </form>
      </mat-card-content>
    </mat-card>
  `,
  styles: [`
    .ng-star-inserted {
      width: 100%;
    }
    .mat-card {
      margin-top: 100px;
      width: 300px;
      display: block;
      margin-left:auto;
      margin-right:auto;
      vertical-align:middle;
    }
    .mat-card-title {
      text-align: center;
    }

    .mat-raised-button {
      width:30%;
      margin-left:35%;
      margin-right:35%;
    }
  `
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
