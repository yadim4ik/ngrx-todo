import { TestBed } from "@angular/core/testing";
import { DataService } from "../../services/data-service/data.service";
import { of } from "rxjs";
import { TodoDataActions } from "../actions/todo.actions";
import { todosLoadEffect } from "./todo.effects";
import { Todo } from "../models/todo.model";

describe('TodoEffects', () => {
  let service: DataService;

  const todosMock: Todo[] = [{
    id: 1,
    userId: 1,
    title: 'Test',
    completed: false,
  }, {
    id: 2,
    userId: 1,
    title: 'Test 2',
    completed: true,
  }];

  const dataService = jasmine.createSpyObj('TodoService', {
    getTodos: of(todosMock),
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: DataService,
          useValue: dataService,
        },
      ]
    })

    service = TestBed.inject(DataService);
  });

  it('should load todos', (done) => {
    const actionsMock$ = of(TodoDataActions.load());

    todosLoadEffect(actionsMock$, service).subscribe((action) => {
      expect(action).toEqual(
        TodoDataActions.loadSuccess({ todos: todosMock })
      );

      done();
    });
  });
});
