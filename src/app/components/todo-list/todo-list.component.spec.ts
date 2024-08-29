import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoListComponent } from './todo-list.component';
import { MockStore, provideMockStore } from "@ngrx/store/testing";
import { TodoActions, TodoDataActions } from "../../store/actions/todo.actions";

describe('TodosComponent', () => {
  let component: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodoListComponent],
      providers: [
        provideMockStore()
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodoListComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);

    spyOn(store, 'dispatch').and.callThrough();
    spyOn(store, 'pipe').and.callThrough();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should delete item', () => {
    const action = TodoActions.remove({id: 1});
    component.deleteItem({id: 1, userId: 1, title: 'test', completed: false});
    expect(store.dispatch).toHaveBeenCalledWith(action);
  });

  it('should apply filter', () => {
    const action = TodoActions.filter({filter: {hideCompleted: true}});
    component.updateFilter(true);
    expect(store.dispatch).toHaveBeenCalledWith(action)
  });
});
