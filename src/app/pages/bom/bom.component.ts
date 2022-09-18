
import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import { Base } from '../_ewo/base';
import { EwoColumn, EwoProperty } from '../_ewo/model/model';
import { SelectItem, LazyLoadEvent, FilterMetadata } from 'primeng/components/common/api';

import { BaseService as EwoService } from '../_ewo/service/service';

import { BomCls } from './bom.model';
import { BomService } from './bom.service';
import { BaseService } from './../_services/base.service';
import { TabsetComponent } from 'ngx-bootstrap/tabs';
import { BooleanPipe } from '../../pipes/boolean.pipe';

@Component({
    templateUrl: 'bom.component.html',
    providers: [EwoService, BaseService, BomService, BooleanPipe]
})
export class BomComponent extends Base implements OnInit {
    @ViewChild('tabset', { static: false }) tabset: TabsetComponent;

    breadCrumbItems: Array<{}>;

    list: BomCls[];
    columns: any[];
    item: BomCls = new BomCls();
    selectedItems: BomCls[];
    value: Date;

    // checkedNonStock(): boolean = false;
    // checkedBlocked(): boolean = false;

    listpartner: SelectItem[];
    validationform: FormGroup;
    submitted: boolean;
    nonstock: boolean;
    blocked: boolean;

    constructor(private serviceBase1: EwoService, private service: BaseService, public formBuilder: FormBuilder) {
        super(serviceBase1);
    }

    ngOnInit() {
        this.service.entity = this.entityapi = 'bom';
        this.breadCrumbItems = [{ label: 'Dashboard', path: '/' }, { label: 'Dev', path: '/' }, { label: 'Primeng module demo', path: '/', active: true }];

        this.validationform = this.formBuilder.group({
            id: [''],
            nonstock: ['', [Validators.required]],
            article: ['', [Validators.required]],
            code: ['', [Validators.required]],
            blocked: ['', [Validators.required]],
            minQty: ['', [Validators.required]],
            optimQty: ['', [Validators.required]],
            revision: ['', [Validators.required]],
            revisionDate: ['', [Validators.required]],
            date: ['', [Validators.required]],
            scrapPercent: ['', [Validators.required]],
            um: ['', [Validators.required]],
            type: ['', [Validators.required]],
            deliveryMaxTerm: ['', [Validators.required]],
            obs: ['', [Validators.required]],

        });

        this.service.findAllItems().subscribe((all) => {
            this.list = all;

            this.columns = [];
            if (this.list && this.list.length > 0)
                for (var k in this.list[0]) {

                    if (k != 'id')
                        this.columns.push(k);
                }
        });


        
        super.ngOnInit();
    }


    add() {
        this.submitted = false;
        this.validationform.reset();
        this.item = new BomCls();
        
        this.displayDialog1 = true;
    }

    edit() {
        if (!this.validSelection(this.selectedItems))
            return;

        this.submitted = false;
        this.item = JSON.parse(JSON.stringify(this.selectedItems)) as BomCls;
        this.validationform.patchValue(this.item);
        this.checkedNonStock();
        this.displayDialog1 = true;
    }

    onRowDblClick(event, data) {
        this.selectedItems = data;
        this.checkedNonStock();
        console.log(this.form.nonstock.value);
        console.log(this.checkedNonStock());
        this.edit();
    }

    onSubmit(values: object) {
        (values['id']) ? this.updateItem(values) : this.createItem(values);
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
        if (!this.validSelection(this.selectedItems) || !confirm("Continue?"))
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
                const doc = new jsPDF.default(0, 0);
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

    handleNonStock($event) {
        if ($event.target.checked) {
            this.form.nonstock.patchValue(1);
        } else if (this.form.nonstock.value === undefined || null) { this.form.nonstock.patchValue(0); }
        else if (this.form.nonstock.value === true && $event.target.checked === false) { this.form.nonstock.patchValue(0) }

        console.log('$event.target.checked :' + $event.target.checked);
        console.log('$event.target.value :' + $event.target.value);
        console.log('this.form.nonstock.value :' + this.form.nonstock.value);
        // console.log('check :' + this.check);
    }
    checkedNonStock(): boolean {
        if (this.form.nonstock.value) {
            return true;
        } else if (this.form.nonstock.value === undefined) {
            return false;
        } else if (this.form.nonstock.value === null) {
            return false;
        } else if (!this.form.nonstock.value) {
            return false;
        }
    }

    handleBlocked($event) {
        if ($event.target.checked) {
            this.form.blocked.patchValue(1);
        } else if (this.form.blocked.value === undefined || null) { this.form.blocked.patchValue(0); }
        else if (this.form.blocked.value === true && $event.target.checked === false) { this.form.blocked.patchValue(0) }

        console.log('$event.target.checked :' + $event.target.checked);
        console.log('$event.target.value :' + $event.target.value);
        console.log('this.form.blocked.value :' + this.form.blocked.value);
        // console.log('check :' + this.check);
    }
    checkedBlocked(): boolean {
        if (this.form.blocked.value) {
            return true;
        } else if (this.form.blocked.value === undefined) {
            return false;
        } else if (this.form.blocked.value === null) {
            return false;
        } else if (!this.form.blocked.value) {
            return false;
        }
    }

}