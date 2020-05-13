import { FilemanagerService } from "./../../pages/documents/filemanager/service/service";
import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from "@angular/common/http";
import { Observable, from, Subscription, of, empty, forkJoin } from "rxjs";
import { catchError, tap, count, finalize, take, takeLast,  bufferCount, } from "rxjs/operators";
import { PostingConfirmationService } from "./../../pages/farm/reg_animals/posting-confirmation.service";

@Injectable()
export class ResponseOnPostInterceptor implements HttpInterceptor {
  b: number = 0;
  lastValEmitted: boolean = false;

  statusArray$: Observable<any>;
  bfCntArray: Array<number>;
  eventStatusCounter$: Observable<number>;
  subscribeB: Subscription;

  constructor(private service: PostingConfirmationService) {
     
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      tap((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse && event.status === 201) {
          const arr = [];
          this.b += 1;
          arr.push(this.b);
          this.service.compareB$ = from(arr);
          console.log(arr);
           
        }
       
      }),
      
      // takeLast(1),      
      // finalize(() => {
      //   this.service.compareB$.subscribe(val => this.service.b = val);
      // })
    );
   
  }
 
  

 
  
}
