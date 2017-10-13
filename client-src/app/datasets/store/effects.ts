import { Injectable } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/concatMap';

import * as fromDataset from './index';
import * as fromProjects from '../../projects/store';
import * as actions from './actions';
import * as loadingActions from '../../core/app-store/loading/actions';
import * as projectActions from '../../projects/store/collection.actions';
import { Dataset, Concept, Respondent } from '../models';
import { DatasetDataService } from '../services/dataset-data.service';

@Injectable()
export class DatasetEffects {

  @Effect()
  loadDataset$: Observable<Action> = this.actions$
    .ofType(actions.LOAD)
    .map((action: actions.LoadAction) => action.payload)
    .switchMap(payload => this.db.loadDataset(payload)
      .map(dataset => new actions.LoadSuccessAction(dataset))
      .catch(error => of(new actions.LoadFailAction(error)))
  );

  @Effect()
  processFile$: Observable<Action> = this.actions$
    .ofType(actions.PROCESS_FILE)
    .withLatestFrom(this.store.select(fromProjects.getProjectsEditingEntity))
    .map(([action, projectEditing]) => ({
      file: (action as actions.ProcessFileAction).payload,
      projectId: projectEditing.projectId
    }))
    .switchMap(mappedVal => this.db.processFile(mappedVal.file, mappedVal.projectId)
      .map(dataset => new actions.ProcessFileSuccessAction(dataset))
      .catch(error => of(new actions.ProcessFileFailAction(error)))
    );

  @Effect()
  processFileSuccess$: Observable<Action> = this.actions$
    .ofType(actions.PROCESS_FILE_SUCCESS)
    .map((action: actions.ProcessFileSuccessAction) => action.payload)
    .switchMap(payload => of(new actions.UploadAction(payload)));

  @Effect()
  changeConcepts$: Observable<Action> = this.actions$
    .ofType(actions.CHANGE_CONCEPTS)
    .withLatestFrom(this.store.select(fromDataset.getDataset))
    .map(([action, dataset]) => ({
      changedConcepts: (action as actions.ChangeConceptsAction).payload,
      dataset
    }))
    .switchMap(mappedValue =>
      this.db.changeConcepts(mappedValue.changedConcepts, mappedValue.dataset)
        .map(dataset => new actions.ChangeConceptsSuccessAction(dataset))
        .catch(error => of(new actions.ChangeConceptsFailAction(error)))
  );

  @Effect()
  changeConceptsSuccess$: Observable<Action> = this.actions$
    .ofType(actions.CHANGE_CONCEPTS_SUCCESS)
    .map((action: actions.ChangeConceptsSuccessAction) => action.payload)
    .switchMap(payload => of(new actions.UploadAction(payload)));

  @Effect()
  changeFilters$: Observable<Action> = this.actions$
    .ofType(actions.CHANGE_FILTERS)
    .withLatestFrom(this.store.select(fromDataset.getDataset))
    .map(([action, dataset]) => ({
      changedFilters: (action as actions.ChangeFiltersAction).payload,
      dataset
    }))
    .switchMap(mappedValue =>
      this.db.changeFilters(mappedValue.changedFilters, mappedValue.dataset)
        .map(dataset => new actions.ChangeFiltersSuccessAction(dataset))
        .catch(error => of(new actions.ChangeFiltersFailAction(error)))
  );

  @Effect()
  changeFiltersSuccess$: Observable<Action> = this.actions$
    .ofType(actions.CHANGE_FILTERS_SUCCESS)
    .map((action: actions.ChangeFiltersSuccessAction) => action.payload)
    .switchMap(payload => of(new actions.UploadAction(payload)));

  @Effect()
  uploadDataset$: Observable<Action> = this.actions$
    .ofType(actions.UPLOAD)
    .withLatestFrom(this.store.select(fromProjects.getProjectsEditingEntity))
    .map(([action, projectEditing]) => ({
      dataset: (action as actions.UploadAction).payload,
      projectId: projectEditing.projectId
    }))
    .switchMap(mappedValue => this.db.updateDataset(mappedValue.projectId, mappedValue.dataset)
      .map(dataset => new actions.UploadSuccessAction(dataset))
      .catch(error => of(new actions.UploadFailAction(error)))
  );

  @Effect({ dispatch: false })
  unloadDataset$: Observable<Action> = this.actions$
    .ofType(projectActions.EDIT)
    .do((action: projectActions.EditAction) => {
      if (!action.payload) {
        this.store.dispatch(new actions.UnloadAction());
      }
    });

  constructor(
    private actions$: Actions,
    private db: DatasetDataService,
    private store: Store<fromDataset.State>
  ) { }
}
