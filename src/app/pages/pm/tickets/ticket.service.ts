import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
// import { tableData } from './data';
import { TableData } from './tickets.model';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { DecimalPipe } from '@angular/common';
import { debounceTime, delay, switchMap, tap, catchError, map } from 'rxjs/operators';

import {environment} from 'src/environments/environment';

import { SortDirection } from './tickets-sortable.directive';

import { SearchResult } from './tickets.model';

interface State {
  page: number;
  pageSize: number;
  searchTerm: string;
  sortColumn: string;
  sortDirection: SortDirection;
  startIndex: number;
  endIndex: number;
  totalRecords: number;
}

function compare(v1, v2) {
  return v1 < v2 ? -1 : v1 > v2 ? 1 : 0;
}


/**
 * Sort the table data
 * @param tickets Table field value
 * @param column Fetch the column
 * @param direction Sort direction Ascending or Descending
 */

function sort(tickets: TableData[], column: string, direction: string): TableData[] {
  if (direction === '') {
    return tickets;
  } else {
    return [...tickets].sort((a, b) => {
      const res = compare(a[column], b[column]);
      return direction === 'asc' ? res : -res;
    });
  }
}

/**
 * Table Data Match with Search input
 * @param ticket Table field value fetch
 * @param term Search the value
 */
function matches(ticket: TableData, term: string) {
  return ticket.subject.toLowerCase().includes(term)
    || ticket.createddate.toLowerCase().includes(term)
    || ticket.priority.toLowerCase().includes(term)
    || ticket.id.toLowerCase().includes(term)
    || ticket.duedate.toLowerCase().includes(term)
    || ticket.status.toLowerCase().includes(term);
}

@Injectable({
  providedIn: 'root'
})

export class TicketService {
  private ticketsApiURL = environment.server.url+'/api/tickets';
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  private tableData: TableData[];


  // tslint:disable-next-line: variable-name
  private _loading$ = new BehaviorSubject<boolean>(true);
  // tslint:disable-next-line: variable-name
  private _search$ = new Subject<void>();
  // tslint:disable-next-line: variable-name
  private _tickets$ = new BehaviorSubject<TableData[]>([]);
  // tslint:disable-next-line: variable-name
  private _total$ = new BehaviorSubject<number>(0);

  // tslint:disable-next-line: variable-name
  private _state: State = {
    page: 1,
    pageSize: 10,
    searchTerm: '',
    sortColumn: '',
    sortDirection: '',
    startIndex: 1,
    endIndex: 10,
    totalRecords: 0
  };

  constructor(private pipe: DecimalPipe, private httpClient: HttpClient) {
    this._search$.pipe(
      tap(() => this._loading$.next(true)),
      debounceTime(200),
      switchMap(() => this._search()),
      delay(200),
      tap(() => this._loading$.next(false))
    ).subscribe(result => {
      this._tickets$.next(result.tickets);
      this._total$.next(result.total);
    });

    this._search$.next();
  }

  get tickets$() { return this._tickets$.asObservable(); }
  get total$() { return this._total$.asObservable(); }
  get loading$() { return this._loading$.asObservable(); }
  get page() { return this._state.page; }
  get pageSize() { return this._state.pageSize; }
  get searchTerm() { return this._state.searchTerm; }
  get startIndex() { return this._state.startIndex; }
  get endIndex() { return this._state.endIndex; }
  get totalRecords() { return this._state.totalRecords; }
  // tslint:disable-next-line: adjacent-overload-signatures
  set page(page: number) { this._set({ page }); }
  // tslint:disable-next-line: adjacent-overload-signatures
  set pageSize(pageSize: number) { this._set({ pageSize }); }
  // tslint:disable-next-line: adjacent-overload-signatures
  set startIndex(startIndex: number) { this._set({ startIndex }); }
  // tslint:disable-next-line: adjacent-overload-signatures
  set endIndex(endIndex: number) { this._set({ endIndex }); }
  // tslint:disable-next-line: adjacent-overload-signatures
  set totalRecords(totalRecords: number) { this._set({ totalRecords }); }
  // tslint:disable-next-line: adjacent-overload-signatures
  set searchTerm(searchTerm: string) { this._set({ searchTerm }); }
  set sortColumn(sortColumn: string) { this._set({ sortColumn }); }
  set sortDirection(sortDirection: SortDirection) { this._set({ sortDirection }); }

  private _set(patch: Partial<State>) {
    Object.assign(this._state, patch);
    this._search$.next();
  }

  /**
   * Search Method
   */
  private _search(): Observable<SearchResult> {
    const { sortColumn, sortDirection, pageSize, page, searchTerm } = this._state;

    // 1. sort
    let tickets = sort(this.tableData, sortColumn, sortDirection);

    // 2. filter
    tickets = tickets.filter(ticket => matches(ticket, searchTerm));
    const total = tickets.length;

    // 3. paginate
    this.totalRecords = tickets.length;
    this._state.startIndex = (page - 1) * this.pageSize + 1;
    this._state.endIndex = (page - 1) * this.pageSize + this.pageSize;
    if (this.endIndex > this.totalRecords) {
      this.endIndex = this.totalRecords;
    }
    tickets = tickets.slice(this._state.startIndex - 1, this._state.endIndex - 1);

    return of({ tickets, total });
  }

  public findAllTickets(): Observable<TableData[]> {
    return this.httpClient.get<TableData[]>(this.ticketsApiURL).pipe(
      tap(_ => console.log('get items')),
      catchError(this.handleError<any>('get items'))
    );
  }

  public _createTicket(item: object): Observable<TableData> {
    return this.httpClient.post<TableData[]>(this.ticketsApiURL, item, this.httpOptions).pipe(
      tap((ticket: TableData[]) => console.log('added item')),
      catchError(this.handleError<any>('create item'))
    );
  }

  public deleteTicket(id: number): Observable<TableData> {
    return this.httpClient.delete<TableData[]>(`${this.ticketsApiURL}/${id}`, this.httpOptions).
      pipe(
        tap((ticket: TableData[]) => console.log('item deleted')),
        catchError(this.handleError<any>('delete item'))
      );
  }

  public getTicket(id: number): Observable<TableData> {
    return this.httpClient.get<TableData>(`${this.ticketsApiURL}/${id}`, this.httpOptions).
      pipe(
        tap((ticket: TableData) => console.log(`fetched item id=${id}`)),
        catchError(this.handleError<any>('get item'))
      );
  }

  public updateTicket(id, item): Observable<TableData> {
    return this.httpClient.put<TableData>(`${this.ticketsApiURL}/${id}`, item, this.httpOptions).
      pipe(
        tap((ticket: TableData) => console.log(`fetched item id=${id}`)),
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
