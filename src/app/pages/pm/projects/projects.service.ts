
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { ProjectsData } from './projects.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap, catchError, map } from 'rxjs/operators';

import {environment} from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  private projectsApiURL = environment.server.url+'/api/projects';
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };


  constructor(private httpClient: HttpClient) { }

  public findAllProjects(): Observable<ProjectsData[]> {
    return this.httpClient.get<ProjectsData[]>(this.projectsApiURL).pipe(
      tap(_ => console.log('get items')),
      catchError(this.handleError<any>('get items'))
    );
  }

  public _createProject(item: object): Observable<ProjectsData> {
    return this.httpClient.post<ProjectsData[]>(this.projectsApiURL, item, this.httpOptions).pipe(
      tap((project: ProjectsData[]) => console.log('added item')),
      catchError(this.handleError<any>('create item'))
    );
  }

  public deleteProject(id: number): Observable<ProjectsData> {
    return this.httpClient.delete<ProjectsData[]>(`${this.projectsApiURL}/${id}`, this.httpOptions).
      pipe(
        tap((project: ProjectsData[]) => console.log('item deleted')),
        catchError(this.handleError<any>('delete item'))
      );
  }

  public getProject(id: number): Observable<ProjectsData> {
    return this.httpClient.get<ProjectsData>(`${this.projectsApiURL}/${id}`, this.httpOptions).
      pipe(
        tap((project: ProjectsData) => console.log(`fetched item id=${id}`)),
        catchError(this.handleError<any>('get item'))
      );
  }

  public updateProject(id, item): Observable<ProjectsData> {
    return this.httpClient.put<ProjectsData>(`${this.projectsApiURL}/${id}`, item, this.httpOptions).
      pipe(
        tap((project: ProjectsData) => console.log(`fetched item id=${id}`)),
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
