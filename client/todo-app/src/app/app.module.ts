import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { LoginComponent } from './login.component';
import {RouterModule} from "@angular/router";
import {ReactiveFormsModule} from "@angular/forms";
import {CheckTokenGuard} from "./check-token.guard";
import {AttachTokenInterceptor} from "./attach-token.interceptor";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatCardModule} from "@angular/material/card";
import {MatInputModule} from "@angular/material/input";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";

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
    ]),
    BrowserAnimationsModule,
    MatCardModule,
    MatInputModule,
    MatToolbarModule,
    MatButtonModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AttachTokenInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
