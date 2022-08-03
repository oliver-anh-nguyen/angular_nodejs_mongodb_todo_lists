import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ListTodosComponent } from './list-todos.component';
import { HttpClientModule} from "@angular/common/http";
import { TodoComponent } from './todo.component';
import { SetBackgroundDirective } from './set-background.directive';

@NgModule({
  declarations: [
    AppComponent,
    ListTodosComponent,
    TodoComponent,
    SetBackgroundDirective
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
