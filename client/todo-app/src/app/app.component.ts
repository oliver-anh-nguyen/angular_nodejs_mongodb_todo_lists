import { Component } from '@angular/core';
import {UserService} from "./user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  template: `
    <h1>Todos App</h1>
    <router-outlet></router-outlet>
  `
})
export class AppComponent {
  constructor(private userService: UserService, private router: Router) {
    this.userService.refreshState();
    const userState = this.userService.getUserState();
    if (userState?.user_id) {
      this.router.navigate(['/', 'todos']);
    } else {
      this.router.navigate(['/', 'login']);
    }
  }
}
