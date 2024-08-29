import { AppState } from "../store";
import { createSelector } from "@ngrx/store";

export const selectFeature = (state: AppState) => state.todo;

export const todoListSelector = createSelector(
  selectFeature,
  (state) => state.filter.hideCompleted ? state.todos.filter(todo => !todo.completed) : state.todos
);

export const todoStatusSelector = createSelector(
  selectFeature,
  (state) => state.status
);

export const todoErrorSelector = createSelector(
  selectFeature,
  (state) => state.error
);

export const getMaxIdSelector = createSelector(
  selectFeature,
  (state) => state.todos.reduce((maxId, todo) => Math.max(maxId, todo.id) + 1, 1)
);
