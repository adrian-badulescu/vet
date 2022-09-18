import {Component,OnInit,AfterViewChecked} from '@angular/core';

import {Base} from '../../_ewo/base';
import {EwoColumn, EwoProperty} from '../../_ewo/model/model';
import {SelectItem, LazyLoadEvent, FilterMetadata} from 'primeng/components/common/api';

import {BaseService} from '../../_ewo/service/service';
import {GlobalService} from '../../_ewo/global';

import {oferta, produsofertat} from '../oferta/model/model';
import {OfertaService} from '../oferta/service/service';
import {ContractService} from '../contract/service/service';


@Component({
    templateUrl: 'oferta.html',
    providers: [GlobalService,BaseService,OfertaService,ContractService]
})
export class OfertaComponent extends Base implements OnInit,AfterViewChecked {

    list:oferta[];
    item:oferta = new oferta();
    selectedItems:oferta[];

    listprodusofertat:produsofertat[];
    itemprodusofertat: produsofertat = new produsofertat();
    selectedprodusofertat:produsofertat[];

    listpartner:SelectItem[];
    listcontract:SelectItem[];

    listTip: SelectItem[];
    listStadiu: SelectItem[];

    constructor(private serviceGlobal1: GlobalService, private serviceBase1:BaseService,
                private service:OfertaService, private serviceContract:ContractService) {
        super(serviceBase1);
    }

    ngOnInit() {
        this.entitytypeid = "5";
        this.entityapi = 'slsoferta';

        this.listTip = [
            {"value":"_0FA28F934B941","label":"Antreprenor"},
            {"value":"_73F161221B941","label":"Integrator"},
            {"value":"_A9C4DAF53B941","label":"Deviz"},
            {"value":"_C2D57310dmin","label":"End User"}];

        this.listStadiu = [
            {"value":"_0A5697229B941","label":"Castigata"},
            {"value":"_283A2A672B941","label":"Pierduta - investitii anulate"},
            {"value":"_746EEC158B941","label":"Anulata"},
            {"value":"_7CBF7F985B941","label":"Pierduta - pret mare"},
            {"value":"_7DFECEC69B941","label":"In analiza"},
            {"value":"_891F81A14B941","label":"Contract"},
            {"value":"_BE1F0B393B941","label":"Pierduta - investitii amanate"},
            {"value":"_F274E0655B941","label":"Pierduta de antreprenor"}];

        this.service.list(null,0,20).then(all => {
            this.list = all;
            this.leftjoin(this.list, 'contractid', 'contract', this.listcontract);
            this.leftjoin(this.list, 'partenerid', 'partener', this.listpartner);
            this.leftjoin(this.list, 'tip', 'tip2', this.listTip);
            this.leftjoin(this.list, 'situatieofertaid', 'situatieoferta', this.listStadiu);
        });
       
        this.serviceContract.dropdown().then(all => {
            this.listcontract = all;
            this.leftjoin(this.list, 'contractid', 'contract', this.listcontract);
        });

        super.ngOnInit();
    }

    ngAfterViewChecked() {

    }

    add() {
        this.editorMode = 1;
        this.item = new oferta();
        this.item.id = this.guid();
        this.item.genproject = 0;
        this.item.gencontract = 0;
        this.service.ewolistdetail(this.item.id,'slsprodusofertats','ofertaid').then(all => this.listprodusofertat = all);

        this.displayDialog1 = true;
    }

    edit() {
        if (!this.validSelection(this.selectedItems))
            return;

        this.editorMode = 2;
        this.item = <oferta> JSON.parse(JSON.stringify(this.selectedItems[0]));
        this.service.ewolistdetail(this.item.id,'slsprodusofertats','ofertaid')
            .then(all => this.listprodusofertat = all);

        this.displayDialog1 = true;
    }

    delete() {
        if (!this.validSelection(this.selectedItems) || !confirm("Continue?"))
            return;

        for (var i = 0; i < this.selectedItems.length; i++) {
            this.service.delete(this.selectedItems[i].id);
            this.list.splice(this.findSelectedItem(this.list, this.selectedItems[i]), 1);
        }

        this.selectedItems = null;
    }

    save() {

        this.service.save(this.item);

        if (this.editorMode == 1) {
            this.list.unshift(this.item);
        }
        else {
            this.list[this.findSelectedItem(this.list, this.selectedItems[0])] = this.item;
        }

        this.item = null;
        this.selectedItems = null;
        this.displayDialog1 = false;
    }

    loadData(event: LazyLoadEvent) {
        //in a real application, make a remote request to load data using state metadata from event
        //event.first = First row offset
        //event.rows = Number of rows per page
        //event.sortField = Field name to sort with
        //event.sortOrder = Sort order as number, 1 for asc and -1 for dec
        //event.filters: FilterMetadata object having field as key and filter value, filter matchMode as value

        this.service.list(null, event.rows, event.first).then(all => {
            this.list = all;
            this.leftjoin(this.list, 'contractid', 'contract', this.listcontract);
            this.leftjoin(this.list, 'partenerid', 'partener', this.listpartner);
            this.leftjoin(this.list, 'tip', 'tip2', this.listTip);
            this.leftjoin(this.list, 'situatieofertaid', 'situatieoferta', this.listStadiu);
        });
    }

    addprodusofertat(id:number) {

        this.editorMode = 1;
        this.itemprodusofertat = new produsofertat();
        this.itemprodusofertat.id = this.guid();
        this.itemprodusofertat.ofertaid = id;
        this.itemprodusofertat.finalizat = 0;
        this.itemprodusofertat.livrare = 0;
        this.itemprodusofertat.generat = 0;

        this.displayDialog3 = true;
    }
    editprodusofertat() {
        if (!this.validSelection(this.selectedprodusofertat))
            return;

        this.editorMode = 2;
        this.itemprodusofertat = <produsofertat> JSON.parse(JSON.stringify(this.selectedprodusofertat[0]));

        this.displayDialog3 = true;
    }
    saveprodusofertat() {

        this.service.ewosave('slsprodusofertats', this.itemprodusofertat);

        if (this.editorMode == 1)
            this.listprodusofertat.unshift(this.itemprodusofertat);
        else
            this.listprodusofertat[this.findSelectedItem(this.listprodusofertat, this.selectedprodusofertat[0])] = this.itemprodusofertat;

        this.itemprodusofertat = null;
        this.selectedprodusofertat = null;

        this.displayDialog3 = false;
    }
    deleteprodusofertat() {
        if (!this.validSelection(this.selectedprodusofertat) || !confirm("Continue?"))
            return;

        for(var i = 0; i < this.selectedprodusofertat.length; i++){
            this.service.ewodelete('slsprodusofertats', this.selectedprodusofertat[i].id);
            this.listprodusofertat.splice(this.findSelectedItem(this.listprodusofertat, this.selectedprodusofertat[i]), 1);
        }

        this.selectedprodusofertat = null;
    }
}