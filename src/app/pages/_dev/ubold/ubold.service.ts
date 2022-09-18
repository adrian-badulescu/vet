import{Injectable} from '@angular/core';
import{Http, Response, Headers} from '@angular/http';

import{BaseService} from '../../_ewo/service/service';

@Injectable()
export class UboldService extends BaseService{

    constructor(private http1:Http) {
        super(http1);
        this.entityapi = 'ubold';
        this.entitydisplay = 'name';
    }
}