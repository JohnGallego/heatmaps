import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Action, Store } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/concatMap';
import 'rxjs/add/operator/withLatestFrom';

import * as fromCollection from './collection.reducer';
import * as actions from './collection.actions';

import { Project } from '../models/project';
import { ProjectsDataService } from '../services/projects-data.service';

@Injectable()
export class ProjectCollectionEffects {

  @Effect()
  loadProjects$: Observable<Action> = this.actions$
    .ofType(actions.LOAD)
    .startWith(new actions.LoadAction())
    .do(() => {
      this.store.dispatch(new actions.LoadAction());
    })
    .switchMap(() =>
      this.db.loadProjects()
        .map((projects: Project[]) => new actions.LoadSuccessAction(projects))
        .catch(error => of(new actions.LoadFailAction(error)))
    );

  @Effect()
  addProject$: Observable<Action> = this.actions$
    .ofType(actions.ADD)
    .map((action: actions.AddAction) => action.payload)
    .switchMap(payload =>
      this.db.addProject(payload)
        .map(project => new actions.AddSuccessAction(project))
        .catch(error => of(new actions.AddFailAction(error)))
    );

  @Effect({ dispatch: false })
  addProjectSuccessRoute$: Observable<Action> = this.actions$
    .ofType(actions.ADD_SUCCESS)
    .do((action: actions.AddSuccessAction) =>
      this.router.navigate(['/edit', action.payload.projectId])
    );

  @Effect()
  updateProject$: Observable<Action> = this.actions$
    .ofType(actions.UPDATE)
    .map((action: actions.UpdateAction) => action.payload)
    .switchMap(payload =>
      this.db.updateProject(payload)
        .map((project: Project) => new actions.UpdateSuccessAction(project))
        .catch(error => of(new actions.UpdateFailAction(error)))
    );

  constructor(
    private actions$: Actions,
    private db: ProjectsDataService,
    private router: Router,
    private store: Store<fromCollection.State>
  ) { }
}
