import { Task } from './task.interface';

export interface TasksState {
  tasks: Task[];
  isLoading: boolean;
  error: string | null;
}
