import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as fromRoot from '../../core/app-store';
import * as fromCollection from './collection.reducer';

export interface ProjectsState {
  collection: fromCollection.State;
}

export interface State extends fromRoot.State {
  'projects': ProjectsState;
}

export const reducers = {
  collection: fromCollection.reducer
};

/**
 * Collection selectors.
 */
export const getProjectsState = createFeatureSelector<ProjectsState>('projects');
export const getProjectCollectionState = createSelector(getProjectsState, s => s.collection);
export const getProjectsCollection = createSelector(getProjectCollectionState, fromCollection.getCollection);
export const getProjectsEditingEntity = createSelector(getProjectCollectionState, fromCollection.getEntityEditing);


