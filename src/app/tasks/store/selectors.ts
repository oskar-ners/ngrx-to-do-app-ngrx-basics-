import { createSelector } from '@ngrx/store';
import { AppState } from '../../types/appState.interface';

export const selectFeature = (state: AppState) => state.tasks;

export const selectTasks = createSelector(
  selectFeature,
  (state) => state.tasks
);

export const selectIsLoading = createSelector(
  selectFeature,
  (state) => state.isLoading
);

export const selectError = createSelector(
  selectFeature,
  (state) => state.error
);
