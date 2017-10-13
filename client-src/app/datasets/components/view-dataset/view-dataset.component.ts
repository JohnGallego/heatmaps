import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import * as fromDataset from '../../store';
import * as fromProjects from '../../../projects/store';
import * as actions from '../../store/actions';
import * as projectActions from '../../../projects/store/collection.actions';
import { Dataset, Concept, DataFilter } from '../../models';
import { Project } from '../../../projects/models';
import { CanComponentDeactivate  } from '../../../core/services/can-deactivate-guard.service';

@Component({
  selector: 'app-view-dataset',
  templateUrl: './view-dataset.component.html',
  styleUrls: ['./view-dataset.component.scss']
})
export class ViewDatasetComponent implements OnInit, OnDestroy, CanComponentDeactivate {

  dataset$: Observable<Dataset>;
  projectEditing$: Observable<Project>;

  private routeSubscription: Subscription;

  constructor(private store: Store<fromDataset.State>, private route: ActivatedRoute) {
    this.routeSubscription = route.params
      .map(params => {
        this.store.dispatch(new projectActions.EditAction(+params.id));
        return new actions.LoadAction(+params.id);
      }).subscribe(store);
    this.dataset$ = this.store.select(fromDataset.getDataset);
    this.projectEditing$ = this.store.select(fromProjects.getProjectsEditingEntity);
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.routeSubscription.unsubscribe();
  }

  onConceptChange(concepts: Concept[]): void {
    this.store.dispatch(new actions.ChangeConceptsAction(concepts));
  }

  onFiltersChange(filters: DataFilter[]): void {
    this.store.dispatch(new actions.ChangeFiltersAction(filters));
  }

  onDatasetFileSelected(file: File): void {
    this.store.dispatch(new actions.ProcessFileAction(file));
  }

  canDeactivate(): boolean {
    this.store.dispatch(new projectActions.EditAction(null));
    return true;
  }

}
