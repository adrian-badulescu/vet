import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
// import { Pagination } from "../../../../../erp-server/src/filtering/pagination/pagination_cls";
// import { Logs } from "../../../../../erp-server/src/logs/logs.entity";
import { environment } from "src/environments/environment";

//import { ModuleDemo } from './moduledemo/moduledemo.model';
import { map, tap, catchError } from "rxjs/operators";
import { Observable, of } from "rxjs";
import "rxjs/add/operator/toPromise";

@Injectable({
  providedIn: "root",
})
export class BaseService {
  private apiurl = environment.server.url + "/api";
  //private apiurl = environment.server.url;
  private aliasURL = environment.server.url + "/api/db-queries/execute";

  private httpOptions = {
    headers: new HttpHeaders({ "Content-Type": "application/json" }),
  };
  // public viewEntity: string;
  public entity: string;

  constructor(private httpClient: HttpClient) {}

  public getAllViews(view) {
    this.httpClient.get(this.apiurl + "/" + view);
  }

  public querySelect(
    table: string,
    SortBy: string,
    entityFromComponent: string
  ): Observable<any[]> {
    let params = new HttpParams().set("table", table).set("sortBy", SortBy);

    console.log(params.toString());
    return this.httpClient.get<any[]>(
      this.apiurl + "/" + entityFromComponent + "/" + table + "/" + SortBy,
      { params }
    );
  }

  public getPage(
    table: string,
    limit: number,
    page: number    
  ): Observable<any> {
    let params = new HttpParams()
      .set("limit", limit.toString())
      .set("page", page.toString())
      // .set("pageSize", pageSize.toString());
    return this.httpClient.get<any>(this.apiurl + "/" + table, {
      params,
    });
  }

  public findAllItems() {
    return this.findAllItemsEntity(this.entity);
  }

  public findAllItemsEntity(entity: string) {
    return this.httpClient.get<any[]>(`${this.apiurl}/${entity}`).pipe(
      tap((_) => console.log("get items")),
      catchError(this.handleError<any>("get items"))
    );
  }

  public _createItem(item: object) {
    return this._createItemEntity(this.entity, item);
  }
  public _createItemEntity(entity: string, item: object) {
    return this.httpClient
      .post<any[]>(`${this.apiurl}/${entity}`, item, this.httpOptions)
      .pipe(
        tap((item: any[]) => console.log("added item")),
        catchError(this.handleError<any>("create item"))
      );
  }

  public deleteItem(id: number): Observable<any> {
    return this.deleteItemEntity(this.entity, id);
  }
  public deleteItemEntity(entity: string, id: any): Observable<any> {
    return this.httpClient
      .delete<any[]>(`${this.apiurl}/${entity}/${id}`, this.httpOptions)
      .pipe(
        tap((item: any[]) => console.log("item deleted")),
        catchError(this.handleError<any>("delete item"))
      );
  }

  public getItem(id: number): Observable<any> {
    return this.getItemEntity(this.entity, id);
  }
  public getItemEntity(entity: string, id: number): Observable<any> {
    return this.httpClient.get<any>(`${this.apiurl}/${entity}/${id}`).pipe(
      tap((item: any) => console.log(`fetched item id=${id}`)),
      catchError(this.handleError<any>("get item"))
    );
  }

  public updateItem(id, item): Observable<any> {
    return this.updateItemEntity(this.entity, id, item);
  }
  public updateItemEntity(entity: string, id, item): Observable<any> {
    return this.httpClient
      .put<any>(`${this.apiurl}/${entity}/${id}`, item, this.httpOptions)
      .pipe(
        tap((item: any) => console.log(`fetched item id=${id}`)),
        catchError(this.handleError<any>("update item"))
      );
  }

  public getAliasTableData(entity) {
    return this.httpClient.get<any[]>(`${this.aliasURL}/${entity}`).pipe(
      tap((_) => console.log("get items")),
      catchError(this.handleError<any>("get items"))
    );
  }

  ewolist(entity: string, filters: any, limit: number, offset: number) {
    let params = { offset: offset, limit: limit };

    /*        if (filters)
        params['where'] = filters;*/

    /*        return this.http.get(this.aliasURL+entity + filters?'?filter='+JSON.stringify(filters):'')
    return this.http.get(this.aliasURL+entity + filters?'?filter='+JSON.stringify(filters):'?filter={"limit":'+limit+'}')*/

    if (filters == null || limit == null || offset == null) {
      return this.httpClient.get(this.aliasURL + entity).pipe(
        tap((_) => console.log("get items")),
        catchError(this.handleError<any>("get items"))
      );
    } else {
      return this.httpClient
        .get(this.aliasURL + entity + "?filter=" + JSON.stringify(params))
        .pipe(
          tap((_) => console.log("get items")),
          catchError(this.handleError<any>("get items"))
        );
    }
  }

  private handleError<T>(operation = "operation", result?: T) {
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
    return (
      this.s4() +
      this.s4() +
      "-" +
      this.s4() +
      "-" +
      this.s4() +
      "-" +
      this.s4() +
      "-" +
      this.s4() +
      this.s4() +
      this.s4()
    );
  }
}
