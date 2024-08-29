import { Routes } from '@angular/router';

export const routes: Routes = [{
  path: '',
  loadComponent: () => import('./components/todo-list/todo-list.component').then(m => m.TodoListComponent),
}];
