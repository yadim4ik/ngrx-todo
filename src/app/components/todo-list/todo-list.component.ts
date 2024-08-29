import { Component, inject } from '@angular/core';
import { AsyncPipe } from "@angular/common";
import { Store } from "@ngrx/store";
import { AppState } from "../../store/store";
import { Observable } from "rxjs";
import { Todo } from "../../store/models/todo.model";
import { TodoActions, TodoDataActions } from "../../store/actions/todo.actions";
import { TodoListItemComponent } from "../todo-list-item/todo-list-item.component";
import { todoErrorSelector, todoListSelector, todoStatusSelector } from "../../store/selectors/todo.selectors";
import { TodoStatus } from "../../store/reducers/todo.reducer";
import { MatCheckbox } from "@angular/material/checkbox";

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [
    AsyncPipe,
    TodoListItemComponent,
    MatCheckbox,
  ],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss'
})
export class TodoListComponent {
  store = inject(Store<AppState>);

  status$: Observable<TodoStatus>;
  todos$: Observable<Todo[]>;
  error$: Observable<string | null>;

  protected readonly TodoStatus = TodoStatus;

  constructor() {
    this.todos$ = this.store.select(todoListSelector);
    this.status$ = this.store.select(todoStatusSelector);
    this.error$ = this.store.select(todoErrorSelector);

    this.store.dispatch(TodoDataActions.load());
  }

  deleteItem(todo: Todo): void {
    this.store.dispatch(TodoActions.remove({ id: todo.id }));
  }

  updateItem(todo: Todo): void {
    this.store.dispatch(TodoActions.update({ todo }));
  }

  updateFilter(hideCompleted: boolean): void {
    this.store.dispatch(TodoActions.filter({ filter: {hideCompleted} }));
  }
}
