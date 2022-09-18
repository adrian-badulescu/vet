import { OnInit } from '@angular/core';
import { Base } from '../../_ewo/base';
import { SelectItem, LazyLoadEvent } from 'primeng/components/common/api';
import { BaseService } from '../../_ewo/service/service';
import { GlobalService } from '../../_ewo/global';
import { Contract } from '../contract/model/model';
import { ContractService } from '../contract/service/service';
import { PartnerService } from '../partner/service/service';
export declare class ContractComponent extends Base implements OnInit {
    private serviceGlobal1;
    private serviceBase1;
    private service;
    private servicePartner;
    list: Contract[];
    item: Contract;
    selectedItems: Contract[];
    value: Date;
    listpartner: SelectItem[];
    constructor(serviceGlobal1: GlobalService, serviceBase1: BaseService, service: ContractService, servicePartner: PartnerService);
    ngOnInit(): void;
    add(): void;
    edit(): void;
    delete(): void;
    save(): void;
    loadData(event: LazyLoadEvent): void;
}
