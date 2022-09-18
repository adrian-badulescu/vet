import{Injectable} from '@angular/core';
import{Http, Response, Headers} from '@angular/http';

import{BaseService} from '../../../_ewo/service/service';

import{oferta, produsofertat} from '../model/model';

@Injectable()
export class OfertaService extends BaseService{

    constructor(private http1:Http) {
        super(http1);
        this.entityapi = 'slsoferta';
        this.entitydisplay = 'titlu';
    }
}