import { Component } from '@angular/core';
import {RouterService} from "./core/services/router.service";

@Component({
  selector: 'app-ubold',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private routerService: RouterService) {
    routerService.loadRouting();
  }
}
