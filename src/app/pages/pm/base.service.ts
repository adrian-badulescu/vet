import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
//import { ModuleDemo } from './moduledemo/moduledemo.model';
import { map, tap, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import {environment} from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class BaseService {

  private apiurl = environment.server.url+'/api/base';
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  public entity: string;

  constructor(private httpClient: HttpClient) {

   }


  public findAllItems() {
    return this.httpClient.get<any[]>(`${this.apiurl}/${this.entity}`).pipe(
      tap(_ => console.log('get items')),
      catchError(this.handleError<any>('get items'))
    );
  }

  public _createItem(item: object) {
    return this.httpClient.post<any[]>(`${this.apiurl}/${this.entity}`, item, this.httpOptions).pipe(
      tap((item: any[]) => console.log('added item')),
      catchError(this.handleError<any>('create item'))
    );
  }

  public deleteItem(id: number): Observable<any> {
    return this.httpClient.delete<any[]>(`${this.apiurl}/${this.entity}/${id}`, this.httpOptions).
      pipe(
        tap((item: any[]) => console.log('item deleted')),
        catchError(this.handleError<any>('delete item'))
      );
  }

  public getItem(id: number): Observable<any> {
    return this.httpClient.get<any>(`${this.apiurl}/${this.entity}/${id}`).
      pipe(
        tap((item: any) => console.log(`fetched item id=${id}`)),
        catchError(this.handleError<any>('get item'))
      );
  }

  public updateItem(id, item): Observable<any> {
    return this.httpClient.put<any>(`${this.apiurl}/${this.entity}/${id}`, item, this.httpOptions).
    pipe(
      tap((item: any) => console.log(`fetched item id=${id}`)),
      catchError(this.handleError<any>('update item'))
    );
  }



  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
}
guid() {

    return this.s4() + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' +
        this.s4() + '-' + this.s4() + this.s4() + this.s4();
}


}
