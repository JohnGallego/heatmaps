import { Action, createSelector } from '@ngrx/store';
import * as actions from './actions';
import { Heatmap } from '../models';

/**
 * State
 */
export interface State {
  ids: number[];
  entities: { [id: number]: Heatmap };
}

const initialState: State = {
  ids: [],
  entities: {}
};

/**
 * Selectors
 */
export const getIds = (state: State) => state.ids;
export const getEntities = (state: State) => state.entities;
export const getCollection = createSelector(
  getIds,
  getEntities,
  (ids, entities) => ids.map(id => entities[id]) || []
);

/**
 * Reducer
 */
export function reducer(state: State = initialState, action: actions.Actions) {
  switch (action.type) {

    case actions.LOAD_SUCCESS: {
      const heatmaps: Heatmap[] = action.payload;
      const heatmapIds = heatmaps.map(hm => hm.heatMapId);
      const heatmapEntities = heatmaps.reduce(
        (entities: { [id: number]: Heatmap }, hm: Heatmap) =>
          Object.assign(
            entities,
            { [hm.heatMapId]: hm }
          ),
        {}
      );

      return Object.assign({}, state, {
        ids: heatmapIds,
        entities: heatmapEntities
      });
    }

    default: {
      return state;
    }
  }
}
