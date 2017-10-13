import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HeatmapsPageComponent } from './components/heatmaps-page/heatmaps-page.component';

const routes: Routes = [
  {
    path: 'heatmaps/:id',
    component: HeatmapsPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HeatmapsRoutingModule { }
