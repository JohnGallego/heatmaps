import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as fromProjects from '../../store';
import { Project } from '../../models';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.scss']
})
export class CollectionComponent implements OnInit {

  projects$: Observable<Project[]>;

  constructor(private store: Store<fromProjects.State>) {
    this.projects$ = this.store.select(fromProjects.getProjectsCollection);
  }

  ngOnInit() {
  }

}
