import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse, HttpHeaders} from '@angular/common/http';
import {debounceTime, delay, switchMap, tap, map, catchError,} from 'rxjs/operators';
// import{BaseService} from '../../../../_ewo/service/service';
import {from, of, Observable} from 'rxjs';

import {environment} from 'src/environments/environment';

import {FolderFile} from '../model/model';
import {ResponseContentType, ResponseType} from "@angular/http";

@Injectable()
export class FilemanagerService {
    private folderApiURL = environment.server.url + "/api/folders";
    private folderData: FolderFile[];
    private httpOptions = {
        headers: new HttpHeaders({'Content-Type': 'application/json'})
    };

    constructor(private httpClient: HttpClient) {

    }

    public findAllFolders() {
        return this.httpClient.get(this.folderApiURL).pipe(
            map(data => this.folderData = data as any)
        );
    }

    public _createFolder(folder: object) {
        return this.httpClient.post<FolderFile[]>(this.folderApiURL, folder, this.httpOptions).pipe(
            tap((folder: FolderFile[]) => console.log('added folder')),
            catchError(this.handleError<any>('create folder'))
        );
    }

    public deleteFolder(id: string): Observable<FolderFile> {
        return this.httpClient.delete<FolderFile[]>(`${this.folderApiURL}/${id}`, this.httpOptions).pipe(
            tap((folder: FolderFile[]) => console.log('folder deleted')),
            catchError(this.handleError<any>('delete folder'))
        );
    }

    deleteFile(name: string): Observable<any> {
        return this.httpClient.delete<any>(environment.server.url + `/api/base/files/${name}`, this.httpOptions).pipe(
            tap((folder: FolderFile[]) => console.log('file deleted')),
            catchError(this.handleError<any>('file folder'))
        );
    }

    public updateFolder(id, folder): Observable<FolderFile> {

        return this.httpClient.put<FolderFile>(`${this.folderApiURL}/${id}`, folder, this.httpOptions).pipe(
            tap((folder: FolderFile) => console.log(`fetched folder id=${id}`)),
            catchError(this.handleError<any>('update folder'))
        );
    }

    getFile(fileID): Observable<any> {
        return this.httpClient.get<any>(environment.server.url + `/api/base/files/${fileID}`, {
            ...this.httpOptions,
            responseType: 'blob' as 'json'
        }).pipe(
            tap((folder: FolderFile) => console.log(`fetched folder id=${fileID}`)),
            catchError(this.handleError<any>('update folder'))
        );
    }

    public getFolderById(id: number): Observable<FolderFile> {
        return this.httpClient.get<FolderFile>(`${this.folderApiURL}/${id}`).pipe(
            tap((folder: FolderFile) => console.log(`fetched folder id=${id}`)),
            catchError(this.handleError<any>('get folder'))
        );
    }

    public zipFolder(id:number): Observable<any>{
        return this.httpClient.post<FolderFile>(`${this.folderApiURL}/folder/zip/${id}`, null).pipe(
            tap((folder: FolderFile) => console.log(`fetched folder id=${id}`)),
            catchError(this.handleError<any>('get folder'))
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
