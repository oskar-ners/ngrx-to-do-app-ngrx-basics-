import { Component, OnInit, inject } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../types/appState.interface';
import * as actions from '../store/actions';
import { Task } from '../types/task.interface';
import { selectError, selectIsLoading, selectTasks } from '../store/selectors';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { map } from 'rxjs';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
  standalone: true,
  imports: [AsyncPipe, FormsModule],
})
export class TasksComponent implements OnInit {
  store = inject(Store<AppState>);

  tasks$!: Observable<Task[]>;
  isLoading$!: Observable<boolean>;
  error$!: Observable<string | null>;

  newTask: string = '';
  updatedTaskTitle: string = '';
  editingTaskId: string | null = null;

  ngOnInit(): void {
    this.tasks$ = this.store.pipe(select(selectTasks));
    this.isLoading$ = this.store.pipe(select(selectIsLoading));
    this.error$ = this.store.pipe(select(selectError));
    this.store.dispatch(actions.getTasks());
  }

  setEditingTaskId(taskId: string): void {
    this.editingTaskId = taskId;
    const task = this.tasks$.pipe(
      map((tasks) => tasks.find((t) => t.id === taskId))
    );
    task.subscribe((t) => (this.updatedTaskTitle = t?.title || ''));
  }

  clearEditingTaskId(): void {
    this.editingTaskId = null;
  }

  addTask(form: NgForm): void {
    if (this.newTask === '') return;
    if (form.valid) {
      this.store.dispatch(actions.addTask({ newTask: this.newTask }));
      this.newTask = '';
    }
  }

  removeTask(taskId: string): void {
    this.store.dispatch(actions.removeTask({ taskId: taskId }));
  }

  editTask(taskId: string, title: string): void {
    const updatedTask: Task = {
      id: taskId,
      title: title,
      isCompleted: false,
    };

    this.store.dispatch(actions.editTask({ taskId, updatedTask }));
    this.clearEditingTaskId();
  }
}
