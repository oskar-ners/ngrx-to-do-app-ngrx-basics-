import { createAction, props } from '@ngrx/store';
import { Task } from '../types/task.interface';

export const getTasks = createAction('[Tasks] Get Tasks');

export const getTasksSuccess = createAction(
  '[Tasks] Get Tasks Success',
  props<{ tasks: Task[] }>()
);

export const getTasksError = createAction(
  '[Tasks] Get Tasks Error',
  props<{ error: string }>()
);
