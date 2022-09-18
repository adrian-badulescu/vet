
import { Injectable, PipeTransform } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';






@Injectable({
  providedIn: 'root',

})

export class CursService {

  private apiurl = 'http://www.infovalutar.ro/';
  public entity: string;


  data: string;
  headers = new HttpHeaders().set('Content-Type', 'text/plain').set('Accept', 'text/plain');
  httpOptions = {
    headers: this.headers,

  };

  constructor(private httpClient: HttpClient) {

  }


  public findCurs(entity: string) {
    return this.httpClient.get(`${this.apiurl}${entity}`, this.httpOptions).pipe(

    );
  }



}
