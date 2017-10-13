import { NgModule, Optional, SkipSelf } from '@angular/core';
import { HttpModule } from '@angular/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import 'hammerjs';
import { SharedModule } from '../shared/shared.module';
import { environment } from '../../environments/environment';

import { HeaderNavComponent } from './components/header-nav/header-nav.component';

import { reducers, metaReducers } from './app-store';
import { LoadingEffects } from './app-store/loading/effects';

import { CanDeactivateGuard } from './services/can-deactivate-guard.service';
import { throwIfAlreadyLoaded } from './utility/module-import-guard';

@NgModule({
  imports: [
    HttpModule,
    SharedModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    StoreRouterConnectingModule,
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    EffectsModule.forRoot([LoadingEffects]),
  ],
  declarations: [
    HeaderNavComponent
  ],
  providers: [
    CanDeactivateGuard
  ],
  exports: [
    HeaderNavComponent
  ]
})
export class CoreModule {
  constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
