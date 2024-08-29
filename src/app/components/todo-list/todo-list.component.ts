import { Component, inject, OnInit } from '@angular/core';
import { AsyncPipe } from "@angular/common";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { Todo } from "../../store/models/todo.model";
import { TodoActions, TodoDataActions } from "../../store/actions/todo.actions";
import { TodoListItemComponent } from "../todo-list-item/todo-list-item.component";
import { todoFeature, TodoStatus } from "../../store/reducers/todo.reducer";
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
export class TodoListComponent implements OnInit {
  store = inject(Store);

  status$: Observable<TodoStatus>;
  todos$: Observable<Todo[]>;
  error$: Observable<string | null>;

  protected readonly TodoStatus = TodoStatus;

  constructor() {
    this.todos$ = <Observable<Todo[]>>this.store.select(todoFeature.selectWithFilter);
    this.status$ = this.store.select(todoFeature.selectStatus);
    this.error$ = this.store.select(todoFeature.selectError);
  }

  ngOnInit() {
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
