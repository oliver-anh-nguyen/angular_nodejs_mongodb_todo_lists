import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject} from "rxjs";
import jwtDecode from "jwt-decode";
import {User} from "./userInterface";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userState$ = new BehaviorSubject<{token: string}>({token: ''});

  constructor(private http: HttpClient) {
  }

  login(email: string, password: string) {
    let url = environment.baseUrl + 'users/login';
    return this.http.post<{token: string}>(url, {email, password});
  }

  getUserState(): User | null {
    const decoded = this.userState$.value.token && jwtDecode(this.userState$.value.token) as User;
    return decoded || null;
  }

  persistState() {
    localStorage.setItem('userState', JSON.stringify(this.userState$.value));
  }

  refreshState() {
    const userState = localStorage.getItem('userState');
    if (userState) {
      this.userState$.next(JSON.parse(userState));
    }
  }

  logout() {
    this.userState$.next({token: ''});
    localStorage.clear();
  }
}
