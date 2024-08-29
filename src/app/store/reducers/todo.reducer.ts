import { Todo } from "../models/todo.model";
import { createReducer, on } from "@ngrx/store";
import { TodoActions, TodoDataActions } from "../actions/todo.actions";

export enum TodoStatus {
  Loading = 'loading',
  Loaded = 'loaded',
  Error = 'error',
}

export interface TodoFilter {
  hideCompleted: boolean;
}

export interface TodoState {
  todos: Todo[];
  status: TodoStatus;
  error: string | null;
  filter: TodoFilter;
}

export const initialState: TodoState = {
  todos: [],
  status: TodoStatus.Loaded,
  error: null,
  filter: {
    hideCompleted: false,
  },
};

export const todoReducer = createReducer(
  initialState,
  on(TodoActions.createSuccess, (state, { todo }) => ({
    ...state,
    todos: [todo, ...state.todos]
  })),
  on(TodoActions.update, (state, { todo }) => ({
    ...state,
    todos: state.todos.map(t => t.id === todo.id ? todo : t)
  })),
  on(TodoActions.remove, (state, { id }) => ({
    ...state,
    todos: state.todos.filter(t => t.id !== id)
  })),
  on(TodoActions.filter, (state, { filter }) => ({
    ...state,
    filter,
  })),
  on(TodoDataActions.load, state => ({
    ...state,
    status: TodoStatus.Loading,
  })),
  on(TodoDataActions.loadSuccess, (state, { todos }) => ({
    ...state,
    todos,
    status: TodoStatus.Loaded,
  })),
  on(TodoDataActions.loadFailure, (state, { error }) => ({
    ...state,
    error,
    status: TodoStatus.Error,
  }))
);
