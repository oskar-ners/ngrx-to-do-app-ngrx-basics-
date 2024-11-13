import { createReducer, on } from '@ngrx/store';
import { TasksState } from '../types/tasksState.interface';
import * as actions from './actions';

export const initialState: TasksState = {
  tasks: [],
  isLoading: false,
  error: null,
};

export const reducers = createReducer(
  initialState,
  on(actions.getTasks, (state) => ({ ...state, isLoading: true })),
  on(actions.getTasksSuccess, (state, action) => ({
    ...state,
    tasks: action.tasks,
    error: null,
    isLoading: false,
  })),
  on(actions.getTasksError, (state, action) => ({
    ...state,
    error: action.error,
    isLoading: false,
  })),
  on(actions.addTask, (state) => ({
    ...state,
  })),
  on(actions.addTaskSuccess, (state, action) => ({
    ...state,
    tasks: [...state.tasks, action.task],
    error: null,
  })),
  on(actions.addTaskError, (state, action) => ({
    ...state,
    error: action.error,
  }))
);
