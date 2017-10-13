import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { reducers } from './store';
import { HeatmapEffects } from './store/effects';
import { HeatmapsDataService } from './store/heatmaps-data.service';

import { HeatmapsRoutingModule } from './heatmaps-routing.module';
import { CollectionComponent } from './components/heatmaps-page/collection.component';
import { HeatmapsPageComponent } from './components/heatmaps-page/heatmaps-page.component';
import { HeatmapComponent } from './components/heatmap/heatmap.component';

@NgModule({
  imports: [
    SharedModule,
    HeatmapsRoutingModule,
    StoreModule.forFeature('heatmaps', reducers),
    EffectsModule.forFeature([
      HeatmapEffects
    ])
  ],
  declarations: [
    CollectionComponent,
    HeatmapsPageComponent,
    HeatmapComponent
  ],
  providers: [
    HeatmapsDataService
  ]
})
export class HeatmapsModule { }
