import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTodoComponent } from './create-todo.component';
import { provideMockStore } from "@ngrx/store/testing";
import { provideNoopAnimations } from "@angular/platform-browser/animations";
import { Store } from "@ngrx/store";
import { Todo } from "../../store/models/todo.model";
import { TodoActions } from "../../store/actions/todo.actions";

describe('CreateTodoComponent', () => {
  let component: CreateTodoComponent;
  let fixture: ComponentFixture<CreateTodoComponent>;
  let store: Store;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateTodoComponent],
      providers: [
        provideMockStore(),
        provideNoopAnimations(),
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateTodoComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Store);
    fixture.detectChanges();

    spyOn(store, 'dispatch').and.callThrough();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
