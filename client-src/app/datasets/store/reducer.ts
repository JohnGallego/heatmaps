import { Action, createSelector } from '@ngrx/store';
import * as actions from './actions';
import { Dataset } from '../models';

/**
 * State
 */
export interface State {
  dataset: Dataset;
}

const initialState: State = {
  dataset: null
};

/**
 * Selectors
 */
export const getDataset = (state: State) => state.dataset;
export const getConcepts = createSelector(getDataset, dataset => dataset && dataset.concepts ? dataset.concepts : []);
export const getRespondents = createSelector(getDataset, dataset => dataset && dataset.respondents ? dataset.respondents : []);

/**
 * Reducer
 */
export function reducer(state: State = initialState, action: actions.Actions) {
  switch (action.type) {

    case actions.LOAD_SUCCESS:
    case actions.UPLOAD_SUCCESS: {
      return {
        dataset: action.payload
      };
    }

    case actions.UNLOAD: {
      return {
        dataset: null
      };
    }

    default: {
      return state;
    }
  }
}
