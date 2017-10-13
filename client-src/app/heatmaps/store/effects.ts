import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Action, Store } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { HeatmapsDataService } from './heatmaps-data.service';
import * as fromHeatmaps from './reducer';
import * as actions from './actions';

@Injectable()
export class HeatmapEffects {

  @Effect()
  loadHeatmaps$: Observable<Action> = this.actions$
    .ofType(actions.LOAD)
    .map((action: actions.LoadAction) => action.payload)
    .switchMap(payload => this.db.loadHeatmaps(payload)
      .map(heatmaps => new actions.LoadSuccessAction(heatmaps))
      .catch(error => of(new actions.LoadFailAction(error)))
  );


  constructor(
    private actions$: Actions,
    private db: HeatmapsDataService,
    private router: Router,
    private store: Store<fromHeatmaps.State>
  ) { }

}
