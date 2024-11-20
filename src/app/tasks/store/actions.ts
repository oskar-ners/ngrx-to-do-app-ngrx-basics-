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

export const removeTask = createAction(
  '[Tasks] Remove Task',
  props<{ taskId: string }>()
);

export const removeTaskSuccess = createAction(
  '[Tasks] Remove Task Success',
  props<{ taskId: string }>()
);

export const removeTaskError = createAction(
  '[Tasks] Remove Task Error',
  props<{ error: string }>()
);

export const editTask = createAction(
  '[Tasks] Edit Task',
  props<{ taskId: string; updatedTask: Task }>()
);

export const editTaskSuccess = createAction(
  '[Tasks] Edit Task Success',
  props<{ task: Task }>()
);

export const editTaskError = createAction(
  '[Tasks] Edit Task Error',
  props<{ error: string }>()
);
