import { NgModule } from '@angular/core';

import {
  MdToolbarModule,
  MdIconModule,
  MdButtonModule,
  MdListModule,
  MdInputModule,
  MdSnackBarModule,
  MdTabsModule,
  MdCardModule,
  MdPaginatorModule,
  MdTooltipModule,
  MdProgressBarModule,
  MdSelectModule
} from '@angular/material';

@NgModule({
  imports: [
    MdToolbarModule,
    MdIconModule,
    MdButtonModule,
    MdListModule,
    MdInputModule,
    MdSnackBarModule,
    MdTabsModule,
    MdCardModule,
    MdPaginatorModule,
    MdTooltipModule,
    MdProgressBarModule,
    MdSelectModule
  ],
  declarations: [],
  exports: [
    MdToolbarModule,
    MdIconModule,
    MdButtonModule,
    MdListModule,
    MdInputModule,
    MdSnackBarModule,
    MdTabsModule,
    MdCardModule,
    MdPaginatorModule,
    MdTooltipModule,
    MdProgressBarModule,
    MdSelectModule
  ]
})
export class MaterialModule { }
