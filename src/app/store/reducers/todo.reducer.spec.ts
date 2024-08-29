import { initialState, todoReducer, TodoStatus } from "./todo.reducer";
import { TodoDataActions } from "../actions/todo.actions";

describe('TodoReducer', () => {
  it('should return the initial state on unknown action', () => {
    const action = {} as any;
    const result = todoReducer(initialState, action);
    expect(result).toBe(initialState);
  });

  it('should handle load', () => {
    const state = {
      ...initialState,
    };

    const expected = {
      ...state,
      status: TodoStatus.Loading,
    };

    const action = TodoDataActions.load();
    expect(todoReducer(state, action)).toEqual(expected);
  });
});
