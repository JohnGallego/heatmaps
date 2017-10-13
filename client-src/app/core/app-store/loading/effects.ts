import { Injectable } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';

import * as fromStore from '../index';
import * as loadingActions from './actions';
import * as projectActions from '../../../projects/store/collection.actions';
import * as datasetActions from '../../../datasets/store/actions';

@Injectable()
export class LoadingEffects {

  @Effect({ dispatch: false })
  loadProjects$: Observable<Action> = this.actions$
    .ofType(projectActions.LOAD)
    .do(() => {
      this.store.dispatch(new loadingActions.LoadingStartAction(projectActions.LOAD));
    });

  @Effect({ dispatch: false })
  loadProjectsComplete$: Observable<Action> = this.actions$
    .ofType(projectActions.LOAD_SUCCESS, projectActions.LOAD_FAIL)
    .do(() => {
      this.store.dispatch(new loadingActions.LoadingCompleteAction(projectActions.LOAD));
    });

  @Effect({ dispatch: false })
  addProjects$: Observable<Action> = this.actions$
    .ofType(projectActions.ADD)
    .do(() => {
      this.store.dispatch(new loadingActions.LoadingStartAction(projectActions.ADD));
    });

  @Effect({ dispatch: false })
  addProjectsComplete$: Observable<Action> = this.actions$
    .ofType(projectActions.ADD_SUCCESS, projectActions.ADD_FAIL)
    .do(() => {
      this.store.dispatch(new loadingActions.LoadingCompleteAction(projectActions.ADD));
    });

  @Effect({ dispatch: false })
  updateProjects$: Observable<Action> = this.actions$
    .ofType(projectActions.UPDATE)
    .do(() => {
      this.store.dispatch(new loadingActions.LoadingStartAction(projectActions.UPDATE));
    });

  @Effect({ dispatch: false })
  updateProjectsComplete$: Observable<Action> = this.actions$
    .ofType(projectActions.UPDATE_SUCCESS, projectActions.UPDATE_FAIL)
    .do(() => {
      this.store.dispatch(new loadingActions.LoadingCompleteAction(projectActions.UPDATE));
    });

  @Effect({ dispatch: false })
  loadDataset$: Observable<Action> = this.actions$
    .ofType(datasetActions.LOAD)
    .do(() => {
      this.store.dispatch(new loadingActions.LoadingStartAction(datasetActions.LOAD));
    });

  @Effect({ dispatch: false })
  loadDatasetComplete$: Observable<Action> = this.actions$
    .ofType(datasetActions.LOAD_SUCCESS, datasetActions.LOAD_FAIL)
    .do(() => {
      this.store.dispatch(new loadingActions.LoadingCompleteAction(datasetActions.LOAD));
    });

  @Effect({ dispatch: false })
  processDatasetFile$: Observable<Action> = this.actions$
    .ofType(datasetActions.PROCESS_FILE)
    .do(() => {
      this.store.dispatch(new loadingActions.LoadingStartAction(datasetActions.PROCESS_FILE));
    });

  @Effect({ dispatch: false })
  processDatasetFileComplete$: Observable<Action> = this.actions$
    .ofType(datasetActions.PROCESS_FILE_SUCCESS, datasetActions.PROCESS_FILE_FAIL)
    .do(() => {
      this.store.dispatch(new loadingActions.LoadingCompleteAction(datasetActions.PROCESS_FILE));
    });

  @Effect({ dispatch: false })
  updateDatasetConcepts$: Observable<Action> = this.actions$
    .ofType(datasetActions.CHANGE_CONCEPTS)
    .do(() => {
      this.store.dispatch(new loadingActions.LoadingStartAction(datasetActions.CHANGE_CONCEPTS));
    });

  @Effect({ dispatch: false })
  updateDatasetConceptsComplete$: Observable<Action> = this.actions$
    .ofType(datasetActions.CHANGE_CONCEPTS_SUCCESS, datasetActions.CHANGE_CONCEPTS_FAIL)
    .do(() => {
      this.store.dispatch(new loadingActions.LoadingCompleteAction(datasetActions.CHANGE_CONCEPTS));
    });

  @Effect({ dispatch: false })
  uploadDataset$: Observable<Action> = this.actions$
    .ofType(datasetActions.UPLOAD)
    .do(() => {
      this.store.dispatch(new loadingActions.LoadingStartAction(datasetActions.UPLOAD));
    });

  @Effect({ dispatch: false })
  uploadDatasetComplete$: Observable<Action> = this.actions$
    .ofType(datasetActions.UPLOAD_SUCCESS, datasetActions.UPLOAD_FAIL)
    .do(() => {
      this.store.dispatch(new loadingActions.LoadingCompleteAction(datasetActions.UPLOAD));
    });

  constructor(
    private actions$: Actions,
    private store: Store<fromStore.State>
  ) { }

}
