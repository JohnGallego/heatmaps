import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from '../environments/environment';

/* App */
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';

/* Features */
import { ProjectsModule } from './projects/projects.module';
import { DatasetsModule } from './datasets/datasets.module';
import { HeatmapsModule } from './heatmaps/heatmaps.module';

@NgModule({
  imports: [
    /** App */
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,

    /** Features */
    CoreModule,
    ProjectsModule,
    DatasetsModule,
    HeatmapsModule
  ],
  declarations: [
    AppComponent
  ],
  providers: [],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
