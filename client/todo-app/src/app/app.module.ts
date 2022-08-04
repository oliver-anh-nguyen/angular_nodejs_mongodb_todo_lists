import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ListTodosComponent } from './todos/list-todos.component';
import { HttpClientModule} from "@angular/common/http";
import { LoginComponent } from './login.component';
import {RouterModule} from "@angular/router";
import {ReactiveFormsModule} from "@angular/forms";
import {CheckTokenGuard} from "./check-token.guard";

// @ts-ignore
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      {path:'', redirectTo: 'login', pathMatch: 'full'},
      {path:'login', component: LoginComponent},
      {path:'todos', loadChildren: () => import('./todos/todos.module')
          .then(module => module.TodosModule),
        canActivate: [CheckTokenGuard]
      },
      {path: '**', redirectTo: 'login'}
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
