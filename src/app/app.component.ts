import { Component, inject } from '@angular/core';
import { RouterOutlet } from "@angular/router";
import { MatToolbar } from "@angular/material/toolbar";
import { MatButton } from "@angular/material/button";
import { Store } from "@ngrx/store";
import { TodoActions } from "./store/actions/todo.actions";

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  imports: [
    RouterOutlet,
    MatToolbar,
    MatButton
  ],
  styleUrl: './app.component.scss'
})
export class AppComponent {
  private store = inject(Store);

  createTodo(): void {
    this.store.dispatch(TodoActions.openCreateDialog());
  }
}
