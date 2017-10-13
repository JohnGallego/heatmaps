import { Component } from '@angular/core';

import { routerTransition } from './styles/router-animations';

@Component({
  selector: 'app-root',
  animations: [ routerTransition ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';

  getState(outlet) {
    return outlet.activatedRouteData.state;
  }

}
