import { Action } from '@ngrx/store';

export const LOADING_START = '[Loading] START';
export const LOADING_COMPLETE = '[Loading] COMPLETE';

export class LoadingStartAction implements Action {
  readonly type = LOADING_START;

  constructor(public payload: string = 'Unkown') {}
}

export class LoadingCompleteAction implements Action {
  readonly type = LOADING_COMPLETE;

  constructor(public payload: string = 'Unkown') {}
}

export type Actions =
  LoadingStartAction
  | LoadingCompleteAction;
