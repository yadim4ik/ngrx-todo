import { Actions, createEffect, ofType } from "@ngrx/effects";
import { inject } from "@angular/core";
import { DataService } from "../../services/data-service/data.service";
import { catchError, map, of, switchMap, tap, throwError, withLatestFrom } from "rxjs";
import { TodoActions, TodoDataActions } from "../actions/todo.actions";
import { MatDialog } from "@angular/material/dialog";
import { CreateTodoComponent } from "../../components/create-todo/create-todo.component";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Store } from "@ngrx/store";
import { Todo } from "../models/todo.model";
import { todoFeature } from "../reducers/todo.reducer";

export const todosLoadEffect = createEffect((
 actions$ = inject(Actions),
 service = inject(DataService),
) => {
  return actions$.pipe(
    ofType(TodoDataActions.load),
    switchMap(() => service.getTodos().pipe(
      /** Uncomment to test error handling */
      // switchMap(() => throwError(() => new Error('Test error'))),
      map((todos) => TodoDataActions.loadSuccess({ todos })),
      catchError((error) => of(TodoDataActions.loadFailure({ error: error.message })))
    ))
  );
}, { functional: true});

export const openCreateDialog = createEffect((
  actions$ = inject(Actions),
  dialog = inject(MatDialog),
) => {
  return actions$.pipe(
    ofType(TodoActions.openCreateDialog),
    tap(() => dialog.open(CreateTodoComponent, { width: '400px', maxWidth: '95vw' })),
  );
}, { functional: true, dispatch: false});

export const createTodoEffect = createEffect((
  store = inject(Store),
  actions$ = inject(Actions),
) => {
  return actions$.pipe(
    ofType(TodoActions.create),
    withLatestFrom(store.select(todoFeature.selectMaxId)),
    map(([{title}, id]) => {
      const todo: Todo = {
        id,
        userId: 1,
        title,
        completed: false,
      }

      return TodoActions.createSuccess({ todo });
    }),
  );
}, { functional: true });


export const createTodoSuccessEffect = createEffect((
  actions$ = inject(Actions),
  dialog = inject(MatDialog),
  snackbar = inject(MatSnackBar),
) => {
  return actions$.pipe(
    ofType(TodoActions.createSuccess),
    tap(() => {
      dialog.openDialogs
        .filter(dialog => dialog.componentInstance instanceof CreateTodoComponent)
        .forEach(d => d.close());
      snackbar.open('Todo created', 'Close', { duration: 5000, horizontalPosition: 'end', verticalPosition: 'top' });
    }),
  );
}, { functional: true, dispatch: false});
