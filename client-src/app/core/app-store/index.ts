import {
  ActionReducer,
  ActionReducerMap,
  MetaReducer,
  createSelector,
  createFeatureSelector
} from '@ngrx/store';
import { routerReducer, RouterReducerState } from '@ngrx/router-store';
import { environment } from '../../../environments/environment';

import * as fromLoading from './loading/reducer';

/**
 * Global app state.
 */
export interface State {
  loading: fromLoading.State;
  router: RouterReducerState;
}

/**
 * Global app reducer.
 */
export const reducers: ActionReducerMap<State> = {
  loading: fromLoading.reducer,
  router: routerReducer
};

/**
 * Meta reducer: action logger.
 */
export function logger(reducer: ActionReducer<State>): ActionReducer<any, any> {
  return function(state: State, action: any): State {
    console.log('state', state, 'action', action);
    // console.log('action', action);
    return reducer(state, action);
  };
}

export const metaReducers: MetaReducer<any, any>[] = !environment.production
? [logger]
: [];

/**
 * Loading selectors.
 */
export const getAppLoadingState = createFeatureSelector<fromLoading.State>('loading');
export const getAppLoading = createSelector(getAppLoadingState, fromLoading.getLoading);
