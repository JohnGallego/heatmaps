import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { SharedModule } from '../shared/shared.module';

import { reducers } from './store';
import { ProjectCollectionEffects } from './store/collection.effects';
import { ProjectsDataService } from './services/projects-data.service';

import { ProjectsRoutingModule } from './projects-routing.module';
import { CollectionComponent } from './components/collection/collection.component';
import { EditComponent } from './components/edit/edit.component';
import { ProjectListComponent } from './components/project-list/project-list.component';
import { EditProjectDetailsComponent } from './components/edit-project-details/edit-project-details.component';

@NgModule({
  imports: [
    SharedModule,
    ProjectsRoutingModule,
    StoreModule.forFeature('projects', reducers),
    EffectsModule.forFeature([
      ProjectCollectionEffects
    ])
  ],
  declarations: [
    CollectionComponent,
    EditComponent,
    ProjectListComponent,
    EditProjectDetailsComponent
  ],
  providers: [
    ProjectsDataService
  ]
})
export class ProjectsModule { }
