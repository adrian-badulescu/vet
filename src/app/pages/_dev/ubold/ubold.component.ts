import {Component,OnInit} from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import {Base} from '../../_ewo/base';
import {EwoColumn, EwoProperty} from '../../_ewo/model/model';
import {SelectItem, LazyLoadEvent, FilterMetadata} from 'primeng/components/common/api';

import {BaseService as EwoService} from '../../_ewo/service/service';

import {Ubold} from './ubold.model';
import {UboldService} from './ubold.service';
import {BaseService} from './../../_services/base.service';

@Component({
    templateUrl: 'ubold.component.html',
    providers: [EwoService,BaseService,UboldService]
})
export class UboldComponent extends Base implements OnInit {

    breadCrumbItems: Array<{}>;

    list:Ubold[];
    columns: any[];
    item:Ubold = new Ubold();
    selectedItems:Ubold[];
    value: Date;

    listpartner:SelectItem[];
    validationform: FormGroup;
    submitted: boolean;

    constructor(private serviceBase1:EwoService, private service:BaseService, public formBuilder: FormBuilder) {
        super(serviceBase1);
    }

    ngOnInit() {
        this.service.entity = this.entityapi = 'ubold';
        this.breadCrumbItems = [{ label: 'Dashboard', path: '/' }, { label: 'Dev', path: '/' }, { label: 'Primeng module demo', path: '/', active: true }];

        this.validationform = this.formBuilder.group({
            id: [''],
            
            
    n1: ['', [Validators.required]],
            
    n2: ['', [Validators.required]],
            
    n3: ['', [Validators.required]],
          });

        this.service.findAllItems().subscribe((all) => {
            this.list = all;

            this.columns = [];
            if (this.list && this.list.length > 0)
            for(var k in this.list[0]) {
       
             if (k != 'id')
              this.columns.push(k);
            }
        });

        super.ngOnInit();
    }


    add() {
        this.submitted = false;
        this.validationform.reset();
        this.item = new Ubold();

        this.displayDialog1 = true;
    }

    edit() {
        if (!this.validSelection(this.selectedItems))
            return;

        this.submitted = false;
        this.item = <Ubold> JSON.parse(JSON.stringify(this.selectedItems));
        this.validationform.patchValue(this.item);

        this.displayDialog1 = true;
    }

    onRowDblClick(event, data) {
        this.selectedItems = data;
        this.edit();
    }

    onSubmit(values: object) {
        (values['id'])?this.updateItem(values):this.createItem(values);
        this.submitted = true;
    }

    createItem(data) { 

        this.item = data;
        this.item['id'] = this.guid();
        //created_at: this.currentDate.getDate() + '/' + this.currentDate.getMonth() + '/' + this.currentDate.getFullYear()
    
        if (this.validationform.valid) {
      
          this.service._createItem(this.item).subscribe((data: any) => {

            this.list.unshift(this.item);
            this.validationform.reset();

            this.item = null;
            this.selectedItems = null;
            this.displayDialog1 = false;
          });
        }
    
    }
    
    updateItem(data) {
    
        if (this.validationform.valid) {
    
        this.item = data;
        this.service.updateItem(this.item['id'], this.item).subscribe(
          data => {

            this.list[this.findSelectedItem(this.list, this.selectedItems)] = this.item;
            this.validationform.reset();

            this.item = null;
            this.selectedItems = null;
            this.displayDialog1 = false;
          });
        }
    
      }

      delete() {
        if (!this.validSelection(this.selectedItems)|| !confirm("Continue?"))
            return;

            let data = this.selectedItems;

        //for (var i = 0; i < this.selectedItems.length; i++) {
            this.service.deleteItem(data['id']).subscribe(res => {
                this.list.splice(this.findSelectedItem(this.list, data), 1);          
              });
        //}

        this.selectedItems = null;
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