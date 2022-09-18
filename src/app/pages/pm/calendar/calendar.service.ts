import { Injectable } from '@angular/core';
import { IEvent } from './event.model';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap, catchError, map } from 'rxjs/operators';

import {environment} from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {
  private meetingsApiURL = environment.server.url+'/api/calendar';
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };


  constructor(private httpClient: HttpClient) { }

  public findAllMeetings(): Observable<IEvent[]> {
    return this.httpClient.get<IEvent[]>(this.meetingsApiURL).pipe(
      tap(_ => console.log('get items')),
      catchError(this.handleError<any>('get items'))
    );
  }

  public _createMeeting(item: object): Observable<IEvent> {
    return this.httpClient.post<IEvent[]>(this.meetingsApiURL, item, this.httpOptions).pipe(
      tap((meeting: IEvent[]) => console.log('added item')),
      catchError(this.handleError<any>('create item'))
    );
  }

  public deleteMeeting(id: number): Observable<IEvent> {
    return this.httpClient.delete<IEvent[]>(`${this.meetingsApiURL}/${id}`, this.httpOptions).
      pipe(
        tap((meeting: IEvent[]) => console.log('item deleted')),
        catchError(this.handleError<any>('delete item'))
      );
  }

  public getMeeting(id: number): Observable<IEvent> {
    return this.httpClient.get<IEvent>(`${this.meetingsApiURL}/${id}`, this.httpOptions).
      pipe(
        tap((meeting: IEvent) => console.log(`fetched item id=${id}`)),
        catchError(this.handleError<any>('get item'))
      );
  }

  public updateMeeting(id, item): Observable<IEvent> {
    return this.httpClient.put<IEvent>(`${this.meetingsApiURL}/${id}`, item, this.httpOptions).
      pipe(
        tap((meeting: IEvent) => console.log(`fetched item id=${id}`)),
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
}
