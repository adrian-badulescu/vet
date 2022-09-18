import {Component,OnInit} from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import {Base} from '../../_ewo/base';
import {EwoColumn, EwoProperty} from '../../_ewo/model/model';
import {SelectItem, LazyLoadEvent, FilterMetadata} from 'primeng/components/common/api';

import {BaseService as EwoService} from '../../_ewo/service/service';

import {Jurnal} from './jurnal.model';
import {JurnalService} from './jurnal.service';
import {BaseService} from '../../_services/base.service';

@Component({
    templateUrl: 'jurnal.component.html',
    providers: [EwoService,BaseService, JurnalService]
})
export class JurnalComponent extends Base implements OnInit {

    breadCrumbItems: Array<{}>;

    list:Jurnal[];
    columns: any[];
    item:Jurnal = new Jurnal();
    selectedItems:Jurnal[];
    value: Date;

    listpartner:SelectItem[];
    validationform: FormGroup;
    submitted: boolean;

    constructor(private serviceBase1:EwoService, private service:BaseService, public formBuilder: FormBuilder) {
        super(serviceBase1);
    }

    ngOnInit() {
        this.service.entity = this.entityapi = 'jurnal';
        this.breadCrumbItems = [{ label: 'Dashboard', path: '/' }, { label: 'Contabilitate', path: '/' }, { label: 'Jurnal', path: '/', active: true }];

        this.validationform = this.formBuilder.group({
            id: [''],
            name: ['', [Validators.required]],
            number: ['', [Validators.required]],
            date: ['', [Validators.required]]
          });

        this.service.ewolist("jurnal", null, null, null).subscribe((all) => {
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
    
}