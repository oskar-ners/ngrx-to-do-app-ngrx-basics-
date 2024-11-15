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

export const addTask = createAction(
  '[Tasks] Add Task',
  props<{ newTask: string }>()
);

export const addTaskSuccess = createAction(
  '[Tasks] Add Task Success',
  props<{ task: Task }>()
);

export const addTaskError = createAction(
  '[Tasks] Add Task Error',
  props<{ error: string }>()
);
