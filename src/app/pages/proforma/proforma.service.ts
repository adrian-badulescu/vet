import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';

import { BaseService } from '../_ewo/service/service';

@Injectable()
export class ProformaService extends BaseService {

    constructor(private http1: Http) {
        super(http1);
        this.entityapi = 'proforma';
        this.entitydisplay = 'name';
    }
}