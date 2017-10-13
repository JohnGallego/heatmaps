import { Action } from '@ngrx/store';
import { Project } from '../models';
import { type } from '../../core/utility/string-types';

export const LOAD = type('[Projects Collection] LOAD');
export const LOAD_SUCCESS = type('[Projects Collection] LOAD_SUCCESS');
export const LOAD_FAIL = type('[Projects Collection] LOAD_FAIL');
export const ADD = type('[Projects Collection] ADD');
export const ADD_SUCCESS = type('[Projects Collection] ADD_SUCCESS');
export const ADD_FAIL = type('[Projects Collection] ADD_FAIL');
export const EDIT = type('[Projects Collection] EDIT');
export const UPDATE = type('[Projects Collection] UPDATE');
export const UPDATE_SUCCESS = type('[Projects Collection] UPDATE_SUCCESS');
export const UPDATE_FAIL = type('[Projects Collection] UPDATE_FAIL');

export class LoadAction implements Action {
  readonly type = LOAD;

  constructor(public payload: any = null) {}
}

export class LoadSuccessAction implements Action {
  readonly type = LOAD_SUCCESS;

  constructor(public payload: Project[]) {}
}

export class LoadFailAction implements Action {
  readonly type = LOAD_FAIL;

  constructor(public payload: string) {}
}

export class AddAction implements Action {
  readonly type = ADD;

  constructor(public payload: any = null) {}
}

export class AddSuccessAction implements Action {
  readonly type = ADD_SUCCESS;

  constructor(public payload: Project) {}
}

export class AddFailAction implements Action {
  readonly type = ADD_FAIL;

  constructor(public payload: string) {}
}

export class EditAction implements Action {
  readonly type = EDIT;

  constructor(public payload: number) {}
}

export class UpdateAction implements Action {
  readonly type = UPDATE;

  constructor(public payload: Project) {}
}

export class UpdateSuccessAction implements Action {
  readonly type = UPDATE_SUCCESS;

  constructor(public payload: Project) {}
}

export class UpdateFailAction implements Action {
  readonly type = UPDATE_FAIL;

  constructor(public payload: any) {}
}

export type Actions =
  LoadAction
  | LoadSuccessAction
  | LoadFailAction
  | AddAction
  | AddSuccessAction
  | AddFailAction
  | EditAction
  | UpdateAction
  | UpdateSuccessAction
  | UpdateFailAction;
