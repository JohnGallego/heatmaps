import { Action } from '@ngrx/store';
import { type } from '../../core/utility/string-types';
import { Dataset, Concept, Respondent, DataFilter } from '../models';

export const LOAD = type('[Datasets] LOAD');
export const LOAD_SUCCESS = type('[Datasets] LOAD_SUCCESS');
export const LOAD_FAIL = type('[Datasets] LOAD_FAIL');
export const UNLOAD = type('[Datasets] UNLOAD');
export const PROCESS_FILE = type('[Datasets] PROCESS_FILE');
export const PROCESS_FILE_SUCCESS = type('[Datasets] PROCESS_FILE_SUCCESS');
export const PROCESS_FILE_FAIL = type('[Datasets] PROCESS_FILE_FAIL');
export const UPLOAD = type('[Datasets] UPLOAD');
export const UPLOAD_SUCCESS = type('[Datasets] UPLOAD_SUCCESS');
export const UPLOAD_FAIL = type('[Datasets] UPLOAD_FAIL');
export const CHANGE_CONCEPTS = type('[Datasets] CHANGE_CONCEPTS');
export const CHANGE_CONCEPTS_SUCCESS = type('[Datasets] CHANGE_CONCEPTS_SUCCESS');
export const CHANGE_CONCEPTS_FAIL = type('[Datasets] CHANGE_CONCEPTS_FAIL');
export const CHANGE_FILTERS = type('[Datasets] CHANGE_FILTERS');
export const CHANGE_FILTERS_SUCCESS = type('[Datasets] CHANGE_FILTERS_SUCCESS');
export const CHANGE_FILTERS_FAIL = type('[Datasets] CHANGE_FILTERS_FAIL');

export class LoadAction implements Action {
  readonly type = LOAD;

  constructor(public payload: number) {}
}

export class LoadSuccessAction implements Action {
  readonly type = LOAD_SUCCESS;

  constructor(public payload: Dataset) {}
}

export class LoadFailAction implements Action {
  readonly type = LOAD_FAIL;

  constructor(public payload: string) {}
}

export class UnloadAction implements Action {
  readonly type = UNLOAD;

  constructor(public payload: any = null) {}
}

export class ProcessFileAction implements Action {
  readonly type = PROCESS_FILE;

  constructor(public payload: File) {}
}

export class ProcessFileSuccessAction implements Action {
  readonly type = PROCESS_FILE_SUCCESS;

  constructor(public payload: Dataset) {}
}

export class ProcessFileFailAction implements Action {
  readonly type = PROCESS_FILE_FAIL;

  constructor(public payload: string) {}
}

export class ChangeConceptsAction implements Action {
  readonly type = CHANGE_CONCEPTS;

  constructor(public payload: Concept[]) {}
}

export class ChangeConceptsSuccessAction implements Action {
  readonly type = CHANGE_CONCEPTS_SUCCESS;

  constructor(public payload: Dataset) {}
}

export class ChangeConceptsFailAction implements Action {
  readonly type = CHANGE_CONCEPTS_FAIL;

  constructor(public payload: string) {}
}

export class ChangeFiltersAction implements Action {
  readonly type = CHANGE_FILTERS;

  constructor(public payload: DataFilter[]) {}
}

export class ChangeFiltersSuccessAction implements Action {
  readonly type = CHANGE_FILTERS_SUCCESS;

  constructor(public payload: Dataset) {}
}

export class ChangeFiltersFailAction implements Action {
  readonly type = CHANGE_FILTERS_FAIL;

  constructor(public payload: string) {}
}

export class UploadAction implements Action {
  readonly type = UPLOAD;

  constructor(public payload: Dataset) {}
}

export class UploadSuccessAction implements Action {
  readonly type = UPLOAD_SUCCESS;

  constructor(public payload: Dataset) {}
}

export class UploadFailAction implements Action {
  readonly type = UPLOAD_FAIL;

  constructor(public payload: string) {}
}

export type Actions =
  LoadAction
  | LoadSuccessAction
  | LoadFailAction
  | UnloadAction
  | ChangeConceptsAction
  | ProcessFileAction
  | ProcessFileSuccessAction
  | ProcessFileFailAction
  | UploadAction
  | UploadSuccessAction
  | UploadFailAction
  | ChangeConceptsSuccessAction
  | ChangeConceptsFailAction
  | ChangeFiltersAction
  | ChangeFiltersSuccessAction
  | ChangeFiltersFailAction;
