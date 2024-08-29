import { Component, inject } from '@angular/core';
import { MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle } from "@angular/material/dialog";
import { MatButton } from "@angular/material/button";
import { MatFormField, MatLabel } from "@angular/material/form-field";
import { MatInput } from "@angular/material/input";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { Store } from "@ngrx/store";
import { TodoActions } from "../../store/actions/todo.actions";

@Component({
  selector: 'app-create-todo',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogActions,
    MatButton,
    MatDialogClose,
    MatFormField,
    MatInput,
    MatLabel,
    MatDialogContent,
    ReactiveFormsModule
  ],
  templateUrl: './create-todo.component.html',
  styleUrl: './create-todo.component.scss'
})
export class CreateTodoComponent {
  form: FormGroup;

  private store = inject(Store);

  constructor() {
    this.form = new FormGroup({
      title: new FormControl('', Validators.required)
    });
  }

  create(): void {
    this.store.dispatch(TodoActions.create(this.form.value));
  }
}
