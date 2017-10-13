import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as fromRoot from '../../core/app-store';
import * as fromHeatmaps from './reducer';

export interface HeatmapsState {
  heatmaps: fromHeatmaps.State;
}

export interface State extends fromRoot.State {
  'heatmaps': HeatmapsState;
}

export const reducers = {
  heatmaps: fromHeatmaps.reducer
};

/**
 * Selectors.
 */
export const getHeatmapsStore = createFeatureSelector<HeatmapsState>('heatmaps');
export const getHeatmapsState = createSelector(getHeatmapsStore, s => s.heatmaps);
export const getCollection = createSelector(getHeatmapsState, fromHeatmaps.getCollection);
