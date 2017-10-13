import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import * as fromProjects from '../../store';
import * as actions from '../../store/collection.actions';
import { Project } from '../../models';
import { CanComponentDeactivate  } from '../../../core/services/can-deactivate-guard.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit, OnDestroy, CanComponentDeactivate {

  projectEditing$: Observable<Project>;
  projectCreating = new Project();

  private routeSubscription: Subscription;

  constructor(private store: Store<fromProjects.State>, private route: ActivatedRoute) {
    this.routeSubscription = route.params
      .map(params => new actions.EditAction(+params.id))
      .subscribe(store);
    this.projectEditing$ = this.store.select(fromProjects.getProjectsEditingEntity);
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.routeSubscription.unsubscribe();
  }

  onCreateUpdate($event: Project): void {
    this.store.dispatch(new actions.AddAction($event));
  }

  onEditUpdate($event: Project): void {
    this.store.dispatch(new actions.UpdateAction($event));
  }

  canDeactivate(): boolean {
    this.store.dispatch(new actions.EditAction(null));
    return true;
  }
}
