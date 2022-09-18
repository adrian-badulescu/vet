import{Injectable} from '@angular/core';
import{Http, Response, Headers} from '@angular/http';

import{BaseService} from '../../../_ewo/service/service';

import{Contract} from '../model/model';

@Injectable()
export class ContractService extends BaseService{

    constructor(private http1:Http) {
        super(http1);
        this.entityapi = 'contracts';
        this.entitydisplay = 'name';
    }
}