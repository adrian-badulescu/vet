import { Injectable } from '@angular/core';
import {NavigationEnd, NavigationStart, Router} from "@angular/router";
import {filter} from "rxjs/operators";
import {CookieService} from "./cookie.service";
import {BaseService} from "../../pages/_services/base.service";

@Injectable({
  providedIn: 'root'
})
export class RouterService {
  private history = [];
  private currentUrl = null;
  constructor(
      private router: Router,
      private cookieService: CookieService,
      private service: BaseService
  ) {
    this.service.entity = 'logs';
  }

  public loadRouting(): void {
    this.router.events
        .pipe(filter(event => event instanceof NavigationEnd))
        .subscribe(({urlAfterRedirects}: NavigationEnd) => {
          const event = {
            module: urlAfterRedirects,
            date: new Date(),
          };
          this.currentUrl = event;
          this.history = [...this.history, event];
          this.createLog();
        });
  }

  public getHistory(): any[] {
    return this.history;
  }

  public getPreviousUrl(): any {
    const previous = {
      module: 'A intrat in aplicatie',
      date: new Date().toISOString()
    };
    return this.history[this.history.length - 2] || previous;
  }

  createLog(){
   const user = JSON.parse(this.cookieService.getCookie('currentUser')).email;
   const curent = this.currentUrl;
   const previous = this.getPreviousUrl();
   const event = {
     user: user,
       module: previous.module,
      startDate: previous.date,
       endDate: curent.date,
   };
   console.log(event);
   this.service._createItem(event).subscribe((data)=>{
       console.log(data);
   });
  }
}
