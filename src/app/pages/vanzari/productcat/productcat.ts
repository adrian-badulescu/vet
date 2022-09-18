import {Component, OnInit} from '@angular/core';

import {Base} from '../../_ewo/base';
import {EwoColumn, EwoProperty} from '../../_ewo/model/model';
import {SelectItem} from 'primeng/components/common/api';

import {BaseService} from '../../_ewo/service/service';
import {GlobalService} from '../../_ewo/global';

import {Productcat} from '../productcat/model/model';
import {ProductcatService} from '../productcat/service/service';

@Component({
    templateUrl: 'productcat.html',
    providers: [GlobalService,BaseService,ProductcatService]
})
export class ProductcatComponent extends Base implements OnInit {

    list:any[];
    item:Productcat = new Productcat();
    selectedItems:any[];

    constructor(private serviceGlobal1: GlobalService, private serviceBase1:BaseService, private service:ProductcatService) {
        super(serviceBase1);
    }

    ngOnInit() {
        this.entitytypeid = "3";
        this.entityapi = 'categories';

        this.service.listtree('parinteid').then(all => this.list = all);

        super.ngOnInit();
    }

    add() {

        this.editorMode = 1;
        this.item = new Productcat();
        this.item.id = this.guid();
        this.item.parinteid = '0';

        if (this.selectedItems && this.selectedItems.length > 0)
            this.item.parinteid = this.selectedItems[0].data.id;

        this.displayDialog1 = true;
    }

    edit() {
        if (!this.validSelection(this.selectedItems))
            return;

        this.editorMode = 2;
        this.item = <Productcat> JSON.parse(JSON.stringify(this.selectedItems[0].data));

        this.displayDialog1 = true;
    }

    save() {

        this.service.save(this.item);

        if (this.editorMode == 1) {
            if (!this.selectedItems || this.selectedItems.length == 0) {
                let newitem = {"data":{},"children":[{"data":{}}]};
                newitem.data = this.item;
                newitem.children = [{"data":{}}];
                this.list.unshift(newitem);
            }
            else{
                this.treeNodeAdd(this.list, this.selectedItems[0].data, this.item);
            }
        }
        else
            this.treeRefresh(this.list, this.item);

        this.item = null;
        this.selectedItems = null;

        this.displayDialog1 = false;
    }

    delete() {
        if (!this.validSelection(this.selectedItems) || !confirm("Continue?"))
            return;

        for (var i = 0; i < this.selectedItems.length; i++) {
            this.service.deletetree(this.list, this.selectedItems[i].data);
        }

        this.selectedItems = null;
    }

    nodeExpand(event) {
        if(event.node) {
            this.service.listtreechildren(event.node.data.id, 'parinteid').then(nodes => event.node.children = nodes);
        }
    }
}