import { inject, Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Todo } from "../../store/models/todo.model";

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private client = inject(HttpClient);
  readonly apiUrl = 'https://jsonplaceholder.typicode.com';

  constructor() { }

  getTodos(): Observable<Todo[]> {
    return this.client.get<Todo[]>(`${this.apiUrl}/todos`);
  }
}
