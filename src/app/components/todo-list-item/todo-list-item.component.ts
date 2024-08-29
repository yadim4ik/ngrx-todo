import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Todo } from "../../store/models/todo.model";
import { NgClass } from "@angular/common";
import { MatCard, MatCardActions, MatCardContent, MatCardHeader } from "@angular/material/card";
import { MatButton, MatIconButton } from "@angular/material/button";
import { MatIcon } from "@angular/material/icon";

@Component({
  selector: 'app-todo-list-item',
  standalone: true,
  imports: [
    MatCard,
    MatButton,
    MatCardHeader,
    MatCardActions,
    MatCardContent,
    MatIconButton,
    MatIcon
  ],
  templateUrl: './todo-list-item.component.html',
  styleUrl: './todo-list-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoListItemComponent {
  @Input() item!: Todo;

  @Output() deleted: EventEmitter<Todo> = new EventEmitter();
  @Output() updated: EventEmitter<Todo> = new EventEmitter();

  completeItem(item: Todo) {
    this.updated.emit({...item, completed: true});
  }

  deleteItem(item: Todo) {
    this.deleted.emit(item);
  }
}
