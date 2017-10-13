import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { SharedModule } from '../shared/shared.module';

import { reducers } from './store';
import { DatasetEffects } from './store/effects';
import { DatasetDataService } from './services/dataset-data.service';

import { DatasetsRoutingModule } from './datasets-routing.module';
import { ViewDatasetComponent } from './components/view-dataset/view-dataset.component';
import { DatasetDetailsComponent } from './components/dataset-details/dataset-details.component';
import { ConceptsViewComponent } from './components/concepts-view/concepts-view.component';
import { FiltersViewComponent } from './components/filters-view/filters-view.component';

@NgModule({
  imports: [
    SharedModule,
    DatasetsRoutingModule,
    StoreModule.forFeature('dataset', reducers),
    EffectsModule.forFeature([
      DatasetEffects
    ])
  ],
  declarations: [
    ViewDatasetComponent,
    DatasetDetailsComponent,
    ConceptsViewComponent,
    FiltersViewComponent
  ],
  providers: [
    DatasetDataService
  ]
})
export class DatasetsModule { }
