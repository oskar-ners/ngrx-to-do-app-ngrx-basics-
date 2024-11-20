import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { TasksService } from '../services/tasks.service';
import * as actions from './actions';
import { catchError, map, mergeMap, of } from 'rxjs';
import { Task } from '../types/task.interface';

@Injectable()
export class TasksEffects {
  actions$ = inject(Actions);
  tasksService = inject(TasksService);

  getTasks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.getTasks),
      mergeMap(() => {
        return this.tasksService.getTasks().pipe(
          map((tasks: Task[]) => actions.getTasksSuccess({ tasks })),
          catchError((error) =>
            of(actions.getTasksError({ error: error.message }))
          )
        );
      })
    )
  );

  addTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.addTask),
      mergeMap((action) => {
        return this.tasksService.addTask(action.newTask).pipe(
          map((task: Task) => actions.addTaskSuccess({ task })),
          catchError((error) =>
            of(actions.addTaskError({ error: error.message }))
          )
        );
      })
    )
  );

  removeTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.removeTask),
      mergeMap((action) => {
        return this.tasksService.removeTask(action.taskId).pipe(
          map(() => actions.removeTaskSuccess({ taskId: action.taskId })),
          catchError((error) =>
            of(actions.removeTaskError({ error: error.message }))
          )
        );
      })
    )
  );

  editTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.editTask),
      mergeMap((action) => {
        return this.tasksService
          .editTask(action.taskId, action.updatedTask)
          .pipe(
            map((task: Task) => actions.editTaskSuccess({ task })),
            catchError((error) =>
              of(actions.editTaskError({ error: error.message }))
            )
          );
      })
    )
  );
}
