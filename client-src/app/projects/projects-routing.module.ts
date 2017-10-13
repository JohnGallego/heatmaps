import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CollectionComponent } from './components/collection/collection.component';
import { EditComponent } from './components/edit/edit.component';
import { CanDeactivateGuard } from '../core/services/can-deactivate-guard.service';

const routes: Routes = [
  {
    path: 'projects',
    component: CollectionComponent
  },
  {
    path: 'edit/:id',
    component: EditComponent,
    canDeactivate: [CanDeactivateGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectsRoutingModule { }
