import{Injectable} from '@angular/core';
import{Http, Response, Headers} from '@angular/http';

import{BaseService} from '../../_ewo/service/service';

@Injectable()
export class CategoriesService extends BaseService{

    constructor(private http1:Http) {
        super(http1);
        this.entityapi = 'contracts';
        this.entitydisplay = 'name';
    }
}