import {Component,OnInit} from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import {Base} from '../../_ewo/base';
import {EwoColumn, EwoProperty} from '../../_ewo/model/model';
import {SelectItem, LazyLoadEvent, FilterMetadata} from 'primeng/components/common/api';

import {BaseService} from '../../_ewo/service/service';
import {GlobalService} from '../../_ewo/global';

import {Contract} from '../contract/model/model';
import {ContractService} from '../contract/service/service';


@Component({
    templateUrl: 'contract.html',
    providers: [GlobalService,BaseService,ContractService]
})
export class ContractComponent extends Base implements OnInit {

    breadCrumbItems: Array<{}>;

    list:Contract[];
    columns: any[];
    item:Contract = new Contract();
    selectedItems:Contract[];
    value: Date;

    listpartner:SelectItem[];
    validationform: FormGroup;
    submitted: boolean;

    constructor(private serviceGlobal1: GlobalService, private serviceBase1:BaseService,
                private service:ContractService, public formBuilder: FormBuilder) {
        super(serviceBase1);
    }

    ngOnInit() {
        this.entitytypeid = "4";
        this.entityapi = 'contracts';
        this.breadCrumbItems = [{ label: 'Dashboard', path: '/' }, { label: 'Dev', path: '/' }, { label: 'Primeng module demo', path: '/', active: true }];

        this.validationform = this.formBuilder.group({
            id: [''],
            name: ['', [Validators.required]],
            number: ['', [Validators.required]],
            date: ['', [Validators.required]]
          });

        this.service.list(null,0,20).then(all => {
            this.list = all;

            this.columns = [];
            if (this.list && this.list.length > 0)
            for(var k in this.list[0]) {
       
             if (k != 'id')
              this.columns.push(k);
            }

            this.leftjoin(this.list, 'partnerid', 'partner', this.listpartner);
        });
        // this.servicePartner.dropdown().then(all => {
        //     this.listpartner = all;
        //     this.leftjoin(this.list, 'partnerid', 'partner', this.listpartner);
        // });

        super.ngOnInit();
    }


    add() {
        this.editorMode = 1;
        this.submitted = false;
        this.validationform.reset();
        this.item = new Contract();
        this.item.id = this.guid();

        this.displayDialog1 = true;
    }

    edit() {
        if (!this.validSelection(this.selectedItems))
            return;

        this.editorMode = 2;
        this.submitted = false;
        this.item = <Contract> JSON.parse(JSON.stringify(this.selectedItems[0]));

        this.displayDialog1 = true;
    }

    delete() {
        if (!this.validSelection(this.selectedItems)|| !confirm("Continue?"))
            return;

        for (var i = 0; i < this.selectedItems.length; i++) {
            this.service.delete(this.selectedItems[i].id);
            this.list.splice(this.findSelectedItem(this.list, this.selectedItems[i]), 1);
        }

        this.selectedItems = null;
    }

    save() {

        this.submitted = true;

        if (!this.validationform.valid)
        return;

        this.item.name = this.validationform.get('name').value;
        this.item.number = this.validationform.get('number').value;
        this.item.date = this.validationform.get('date').value;

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

        this.validationform.reset();
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
            this.leftjoin(this.list, 'partnerid', 'partner', this.listpartner);
        });
    }

    exportPdf() {
        import("jspdf").then(jsPDF => {
            import("jspdf-autotable").then(x => {
                const doc = new jsPDF.default(0,0);
                doc.autoTable(this.columns, this.list);
                doc.save('primengTable.pdf');
            })
        })
    }
    
    exportExcel() {
        import("xlsx").then(xlsx => {
            const worksheet = xlsx.utils.json_to_sheet(this.list);
            const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
            const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
            this.saveAsExcelFile(excelBuffer, "primengTable");
        });
    }

    saveAsExcelFile(buffer: any, fileName: string): void {
        import("file-saver").then(FileSaver => {
            let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
            let EXCEL_EXTENSION = '.xlsx';
            const data: Blob = new Blob([buffer], {
                type: EXCEL_TYPE
            });
            FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
        });
    }

    get form() {
        return this.validationform.controls;
      }
    
}