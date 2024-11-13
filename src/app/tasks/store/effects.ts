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
}
