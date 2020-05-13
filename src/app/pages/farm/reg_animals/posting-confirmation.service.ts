import { Injectable } from "@angular/core";
import { Observable, Subscription, from, of, forkJoin } from "rxjs";
import {
  count,  
  takeLast,
  finalize,
  tap,
  bufferCount,
  take,
  switchMap
} from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class PostingConfirmationService {
  a: number = 0;
  b: number = 0;
  lastValEmitted: boolean = false;

  resetC: number = 0;
  A$: Observable<number>;
  B$: Observable<number>;
  compareA: Array<object>;
  compareB: Array<object>;
  compareA$: Observable<any>;
  compareB$: Observable<any>;
  b$: Observable<any>;
  subscribeA: Subscription;
  subscribeB: Subscription;
  combined: Observable<any>;

  constructor() {}

  loadDataA() {
    this.subscribeA = this.compareA$.pipe(count()).subscribe(
      data => {
        this.a = data;     
      },
      this.err,
      this.complete
    );

  }

  loadDataB() {
    this.compareB$.pipe(count()).subscribe(
      data => {
        this.b = data;
        console.log(this.b);
     
      });
    
  }




  err() {
    console.log("error");
  }

  complete() {
    
  }



  // comp() {
  //   this.combined = forkJoin(this.compareA$, this.compareB$);
  //   this.combined.subscribe(data => console.log(data));

  //   // if (this.a === this.b) {
  //   //   console.log("Posted with success!");
  //   //   // console.log(this.a , this.b);
  //   //   this.b = 0;
  //   // } else {
  //   //   console.log("Atentie! Nu toate obictele s-au postat cu succes");
  //   // }
  //   // console.log(this.a , this.b);
  // }

  onFinalize() {
    console.log("on Finalize() - working");

    // this.comp();
    this.compareB$ = from([]);
    this.compareB$.subscribe(v => console.log(v));
    console.log(this.b);
  }

  // reset() {
  //   this.subscribeA.unsubscribe();
  //   this.b;
  //   this.subscribeB.unsubscribe();
  // }
}
