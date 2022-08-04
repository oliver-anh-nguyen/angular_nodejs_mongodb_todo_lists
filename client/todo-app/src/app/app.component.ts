import {Component, OnDestroy} from '@angular/core';
import {UserService} from "./user.service";
import {Router} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-root',
  template: `
    <p>
      <mat-toolbar color="primary">
        <span>Todos List</span>
      </mat-toolbar>
    </p>
    <button (click)="logout()" *ngIf="isLoggedIn">Logout</button>
    <p *ngIf="isLoggedIn">welcome {{username}}</p>
    <router-outlet></router-outlet>
  `,
  styles: [
    `
      .example-spacer {
        flex: 1 1 auto;
      }
    `
  ]
})
export class AppComponent implements OnDestroy {
  isLoggedIn: boolean = false;
  sub!: Subscription;
  username: string = '';
  constructor(private userService: UserService, private router: Router) {
    this.sub = this.userService.userState$.subscribe(userState => {
      if (userState.token) {
        this.isLoggedIn = true
        this.username = this.userService.getUserState()?.fullname as string;
      } else {
        this.isLoggedIn = false;
      }
    })

    this.userService.refreshState();

    const userState = this.userService.getUserState();
    if (userState?.user_id) {
      this.router.navigate(['/', 'todos']);
    } else {
      this.router.navigate(['/', 'login']);
    }
  }

  logout() {
    this.userService.logout();
    this.router.navigate(['/', 'login']);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
