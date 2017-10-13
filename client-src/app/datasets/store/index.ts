import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as fromRoot from '../../core/app-store';
import * as fromDataset from './reducer';

export interface DatasetState {
  dataset: fromDataset.State;
}

export interface State extends fromRoot.State {
  'dataset': DatasetState;
}

export const reducers = {
  dataset: fromDataset.reducer
};

/**
 * Collection selectors.
 */
export const getDatasetStore = createFeatureSelector<DatasetState>('dataset');
export const getDatasetState = createSelector(getDatasetStore, s => s.dataset);
export const getDataset = createSelector(getDatasetState, fromDataset.getDataset);
export const getConcepts = createSelector(getDatasetState, fromDataset.getConcepts);
export const getRespondents = createSelector(getDatasetState, fromDataset.getRespondents);
