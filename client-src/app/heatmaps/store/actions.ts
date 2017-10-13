import { Action } from '@ngrx/store';
import { type } from '../../core/utility/string-types';
import { Heatmap } from '../models';

export const LOAD = type('[Heatmaps] LOAD');
export const LOAD_SUCCESS = type('[Heatmaps] LOAD_SUCCESS');
export const LOAD_FAIL = type('[Heatmaps] LOAD_FAIL');
export const UNLOAD = type('[Heatmaps] UNLOAD');
export const ADD = type('[Heatmaps] ADD');
export const ADD_SUCCESS = type('[Heatmaps] ADD_SUCCESS');
export const ADD_FAIL = type('[Heatmaps] ADD_FAIL');

export class LoadAction implements Action {
  readonly type = LOAD;

  constructor(public payload: number) {}
}

export class LoadSuccessAction implements Action {
  readonly type = LOAD_SUCCESS;

  constructor(public payload: Heatmap[]) {}
}

export class LoadFailAction implements Action {
  readonly type = LOAD_FAIL;

  constructor(public payload: string) {}
}

export class UnloadAction implements Action {
  readonly type = UNLOAD;

  constructor(public payload: any = null) {}
}

export class AddAction implements Action {
  readonly type = ADD;

  constructor(public payload: Heatmap) {}
}

export class AddSuccessAction implements Action {
  readonly type = ADD_SUCCESS;

  constructor(public payload: Heatmap) {}
}

export class AddFailAction implements Action {
  readonly type = ADD_FAIL;

  constructor(public payload: string) { }
}

export type Actions =
  LoadAction
  | LoadSuccessAction
  | LoadFailAction
  | UnloadAction
  | AddAction
  | AddSuccessAction
  | AddFailAction;
