import { Action, createSelector } from '@ngrx/store';
import * as actions from './actions';

/**
 * State
 */
export interface State {
  loadingActions: string[];
}

const initialState: State = {
  loadingActions: []
};

/**
 * Selectors
 */
export const getLoadingActions = (state: State) => state.loadingActions;
export const getLoading = createSelector(
  getLoadingActions,
  loadingActions => loadingActions.length > 0 ? true : false
);


/**
 * Reducer
 */
export function reducer(state: State = initialState, action: actions.Actions) {
  switch (action.type) {

    case actions.LOADING_START: {
      return {
        loadingActions: [...state.loadingActions, action.payload]
      };
    }

    case actions.LOADING_COMPLETE: {
      const index = state.loadingActions.findIndex(a => a === action.payload);
      return {
        loadingActions: [
          ...state.loadingActions.slice(0, index),
          ...state.loadingActions.slice(index + 1)
        ]
      };
    }

    default: {
      return state;
    }
  }
}
