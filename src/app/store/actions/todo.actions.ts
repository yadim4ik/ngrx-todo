import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { Todo } from "../models/todo.model";
import { TodoFilter } from "../reducers/todo.reducer";

export const TodoActions = createActionGroup({
  source: 'Todo',
  events: {
    'Create': props<{title: string}>(),
    'Create Success': props<{todo: Todo}>(),
    'Update': props<{todo: Todo}>(),
    'Remove': props<{id: number}>(),
    'Filter': props<{filter: TodoFilter}>(),
    'Open Create Dialog': emptyProps(),
  }
})

export const TodoDataActions = createActionGroup({
  source: 'Todo Data',
  events: {
    'Load': emptyProps(),
    'Load Success': props<{todos: Todo[]}>(),
    'Load Failure': props<{error: string}>(),
  }
});
