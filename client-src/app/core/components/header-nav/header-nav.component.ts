import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/observable';

import * as fromRoot from '../../app-store';

@Component({
  selector: 'app-header-nav',
  templateUrl: './header-nav.component.html',
  styleUrls: ['./header-nav.component.scss']
})
export class HeaderNavComponent implements OnInit {

  loading$: Observable<boolean>;

  constructor(private store: Store<fromRoot.State>) {
    this.loading$ = this.store.select(fromRoot.getAppLoading);
   }

  ngOnInit() {

  }

}
