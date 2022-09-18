import{Injectable} from '@angular/core';
import{Http, Response, Headers} from '@angular/http';

import{BaseService} from '../../../_ewo/service/service';

import{Productcat} from '../model/model';

@Injectable()
export class ProductcatService extends BaseService{

    constructor(private http1:Http) {
        super(http1);
        this.entityapi = 'categories';
        this.entitydisplay = 'denumire';
    }
}