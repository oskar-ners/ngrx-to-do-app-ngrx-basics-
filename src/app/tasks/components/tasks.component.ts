import { Component, OnInit, inject } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../types/appState.interface';
import * as actions from '../store/actions';
import { Task } from '../types/task.interface';
import { selectError, selectIsLoading, selectTasks } from '../store/selectors';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  standalone: true,
  imports: [AsyncPipe],
})
export class TasksComponent implements OnInit {
  store = inject(Store<AppState>);

  tasks$!: Observable<Task[]>;
  isLoading$!: Observable<boolean>;
  error$!: Observable<string | null>;

  ngOnInit(): void {
    this.tasks$ = this.store.pipe(select(selectTasks));
    this.isLoading$ = this.store.pipe(select(selectIsLoading));
    this.error$ = this.store.pipe(select(selectError));
    this.store.dispatch(actions.getTasks());
  }
}
