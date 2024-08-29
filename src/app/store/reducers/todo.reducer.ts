import { Todo } from "../models/todo.model";
import { createFeature, createReducer, createSelector, on } from "@ngrx/store";
import { TodoActions, TodoDataActions } from "../actions/todo.actions";
import { createEntityAdapter, EntityState } from "@ngrx/entity";

export enum TodoStatus {
  Loading = 'loading',
  Loaded = 'loaded',
  Error = 'error',
}

export interface TodoFilter {
  hideCompleted: boolean;
}

export interface TodoState extends EntityState<Todo> {
  status: TodoStatus;
  error: string | null;
  filter: TodoFilter;
}

export const todoAdapter = createEntityAdapter<Todo>();

export const initialState: TodoState = todoAdapter.getInitialState({
  status: TodoStatus.Loaded,
  error: null,
  filter: {
    hideCompleted: false,
  },
});

export const todoFeature = createFeature({
  name: 'todo',
  reducer: createReducer(
    initialState,
    on(TodoActions.createSuccess, (state, { todo }) => todoAdapter.addOne(todo, state)),
    on(TodoActions.update, (state, { todo }) => todoAdapter.updateOne({ id: todo.id, changes: todo }, state)),
    on(TodoActions.remove, (state, { id }) => todoAdapter.removeOne(id, state)),
    on(TodoActions.filter, (state, { filter }) => ({
      ...state,
      filter,
    })),
    on(TodoDataActions.load, state => ({
      ...state,
      status: TodoStatus.Loading,
    })),
    on(TodoDataActions.loadSuccess, (state, { todos }) => todoAdapter.setAll(
      todos,
      {...state, status: TodoStatus.Loaded})
    ),
    on(TodoDataActions.loadFailure, (state, { error }) => ({
      ...state,
      error,
      status: TodoStatus.Error,
    }))
  ),
  extraSelectors: ({ selectEntities, selectFilter }) => {
    const selectMaxId = createSelector(
      selectEntities,
      (entities) => Object.values(entities).reduce((maxId, todo) => Math.max(maxId, (<Todo>todo).id) + 1, 1)
    );

    const selectWithFilter = createSelector(
      selectEntities,
      selectFilter,
      (entities, filter) => filter.hideCompleted ?
        Object.values(entities).filter(todo => !(<Todo>todo).completed) :
        Object.values(entities)
    );

    return {selectMaxId, selectWithFilter}
  },
});
