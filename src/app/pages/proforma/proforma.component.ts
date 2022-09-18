
import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import { Base } from '../_ewo/base';
import { EwoColumn, EwoProperty } from '../_ewo/model/model';
import { SelectItem, LazyLoadEvent, FilterMetadata } from 'primeng/components/common/api';

import { BaseService as EwoService } from '../_ewo/service/service';

import { ProformaCls } from './proforma.model';
import { ProformaService } from './proforma.service';
import { BaseService } from '../_services/base.service';
import { TabsetComponent } from 'ngx-bootstrap/tabs';


@Component({
    templateUrl: 'proforma.component.html',
    providers: [EwoService, BaseService, ProformaService],
    
})
export class ProformaComponent extends Base implements OnInit {
    @ViewChild('tabset', { static: false }) tabset: TabsetComponent;
    
    breadCrumbItems: Array<{}>;

    list: ProformaCls[];
    columns: any[];
    item: ProformaCls = new ProformaCls();
    selectedItems: ProformaCls[];
    value: Date;
    Supplier: Array<string> = ['A', 'B', 'C', '...'];
    Type: Array<string> = ['A', 'B', 'C', '...'];
    Status: Array<string> = ['A', 'B', 'C', '...'];

    listpartner: SelectItem[];
    validationform: FormGroup;
    submitted: boolean;

    constructor(private serviceBase1: EwoService, private service: BaseService, public formBuilder: FormBuilder) {
        super(serviceBase1);
    }

    ngOnInit() {
        this.service.entity = this.entityapi = 'facturaproforma';
        this.breadCrumbItems = [{ label: 'Dashboard', path: '/' }, { label: 'Dev', path: '/' }, { label: 'Primeng module demo', path: '/', active: true }];

        this.validationform = this.formBuilder.group({
            id: [''],
            number: ['', [Validators.required]],
            date: ['', [Validators.required]],
            supplier: ['', [Validators.required]],
            account: ['', [Validators.required]],
            description: ['', [Validators.required]],
            value: ['', [Validators.required]],
            type: ['', [Validators.required]],
            dueDate: ['', [Validators.required]],
            requestedDueDate: ['', [Validators.required]],
            applicantNotice: ['', [Validators.required]],
            departChiefNotice: ['', [Validators.required]],
            approved: ['', [Validators.required]],
            status: ['', [Validators.required]],
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
        this.item = new ProformaCls();

        this.displayDialog1 = true;
    }

    edit() {
        if (!this.validSelection(this.selectedItems))
            return;

        this.submitted = false;
        this.item = JSON.parse(JSON.stringify(this.selectedItems)) as ProformaCls;
        this.validationform.patchValue(this.item);

        this.displayDialog1 = true;
    }

    onRowDblClick(event, data) {
        this.selectedItems = data;
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

    handleApplicantNotice($event) {
        if ($event.target.checked) {
            this.form.applicantNotice.patchValue(1);
        } else if (this.form.applicantNotice.value === undefined || null) { this.form.applicantNotice.patchValue(0); }
        else if (this.form.applicantNotice.value === true && $event.target.checked === false) { this.form.applicantNotice.patchValue(0) }

        console.log('$event.target.checked :' + $event.target.checked);
        console.log('$event.target.value :' + $event.target.value);
        console.log('this.form.applicantNotice.value :' + this.form.applicantNotice.value);
        // console.log('check :' + this.check);
    }
    checkedApplicantNotice(): boolean {
        if (this.form.applicantNotice.value) {
            return true;
        } else if (this.form.applicantNotice.value === undefined) {
            return false;
        } else if (this.form.applicantNotice.value === null) {
            return false;
        } else if (!this.form.applicantNotice.value) {
            return false;
        }
    }

    handleDepartChiefNotice($event) {
        if ($event.target.checked) {
            this.form.departChiefNotice.patchValue(1);
        } else if (this.form.departChiefNotice.value === undefined || null) { this.form.departChiefNotice.patchValue(0); }
        else if (this.form.departChiefNotice.value === true && $event.target.checked === false) { this.form.departChiefNotice.patchValue(0) }

        console.log('$event.target.checked :' + $event.target.checked);
        console.log('$event.target.value :' + $event.target.value);
        console.log('this.form.departChiefNotice.value :' + this.form.departChiefNotice.value);
        // console.log('check :' + this.check);
    }
    checkedDepartChiefNotice(): boolean {
        if (this.form.departChiefNotice.value) {
            return true;
        } else if (this.form.departChiefNotice.value === undefined) {
            return false;
        } else if (this.form.departChiefNotice.value === null) {
            return false;
        } else if (!this.form.departChiefNotice.value) {
            return false;
        }
    }

    handleApproved($event) {
        if ($event.target.checked) {
            this.form.approved.patchValue(1);
        } else if (this.form.approved.value === undefined || null) { this.form.approved.patchValue(0); }
        else if (this.form.approved.value === true && $event.target.checked === false) { this.form.approved.patchValue(0) }

        console.log('$event.target.checked :' + $event.target.checked);
        console.log('$event.target.value :' + $event.target.value);
        console.log('this.form.approved.value :' + this.form.approved.value);
        // console.log('check :' + this.check);
    }
    checkedApproved(): boolean {
        if (this.form.approved.value) {
            return true;
        } else if (this.form.approved.value === undefined) {
            return false;
        } else if (this.form.approved.value === null) {
            return false;
        } else if (!this.form.approved.value) {
            return false;
        }
    }

}