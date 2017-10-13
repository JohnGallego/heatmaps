import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewDatasetComponent } from './components/view-dataset/view-dataset.component';
import { CanDeactivateGuard } from '../core/services/can-deactivate-guard.service';

const routes: Routes = [
  {
    path: 'dataset/:id',
    component: ViewDatasetComponent,
    canDeactivate: [CanDeactivateGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DatasetsRoutingModule { }
