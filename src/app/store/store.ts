import { todoReducer, TodoState } from "./reducers/todo.reducer";
import { Action, ActionReducer } from "@ngrx/store";

export interface AppState {
  todo: TodoState
}

export interface AppStore {
  todo: ActionReducer<TodoState, Action>;
}

export const appStore: AppStore = {
  todo: todoReducer
}
