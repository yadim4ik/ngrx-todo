import { TestBed } from '@angular/core/testing';

import { DataService } from './data.service';
import { HttpTestingController, provideHttpClientTesting } from "@angular/common/http/testing";
import { provideHttpClient } from "@angular/common/http";
import { Todo } from "../../store/models/todo.model";

describe('DataServiceService', () => {
  let service: DataService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });
    service = TestBed.inject(DataService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get todo list mock', () => {
    const response: Todo[] = [{
      id: 1,
      userId: 1,
      title: 'test1',
      completed: true,
    }, {
      id: 2,
      userId: 2,
      title: 'test2',
      completed: false,
    }];

    service.getTodos().subscribe(todos => {
      expect(todos).toEqual(response);
    });

    const req = httpMock.expectOne(`${service.apiUrl}/todos`);
    expect(req.request.method).toEqual('GET');
    req.flush(response);
  });
});
