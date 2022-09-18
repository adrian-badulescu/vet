import { OnInit } from '@angular/core';
import { Base } from '../../_ewo/base';
import { BaseService } from '../../_ewo/service/service';
import { GlobalService } from '../../_ewo/global';
import { Productcat } from '../productcat/model/model';
import { ProductcatService } from '../productcat/service/service';
export declare class ProductcatComponent extends Base implements OnInit {
    private serviceGlobal1;
    private serviceBase1;
    private service;
    list: any[];
    item: Productcat;
    selectedItems: any[];
    constructor(serviceGlobal1: GlobalService, serviceBase1: BaseService, service: ProductcatService);
    ngOnInit(): void;
    add(): void;
    edit(): void;
    save(): void;
    delete(): void;
    nodeExpand(event: any): void;
}
