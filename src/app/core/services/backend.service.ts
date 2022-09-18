import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

private inventoryDb = environment.server.url+"/api/tables/advanced"

  constructor(private httpClient:  HttpClient) { }

  public findAllItems() {
    return this.httpClient.get(this.inventoryDb);
  }












}
