import { Component, OnInit, ViewChild } from '@angular/core';
import { Base } from '../../_ewo/base';
import { EwoColumn, EwoProperty } from '../../_ewo/model/model';
import { SelectItem, LazyLoadEvent, FilterMetadata } from 'primeng/components/common/api';

import { BaseService as EwoService } from '../../_ewo/service/service';

import { DecontCls } from './decont.model';

import { BaseService } from '../../_services/base.service';
import { TabsetComponent } from 'ngx-bootstrap/tabs'
import { Validators, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-decont',
  templateUrl: './decont.component.html',
  styleUrls: ['./decont.component.scss'],
  providers: [EwoService, BaseService]
})
export class DecontComponent extends Base implements OnInit {
  @ViewChild('tabset', { static: false }) tabset: TabsetComponent;
  breadCrumbItems: Array<{}>;
  selection: string;


  list: DecontCls[];
  columns: any[];
  item: DecontCls = new DecontCls();
  selectedItems: DecontCls[];
  value: Date;
  listpartner: SelectItem[];
  validationform: FormGroup;
  submitted: boolean;

  Currency: Array<string> = ['A', 'B', 'C'];
  Tear: Array<number> = [1, 2, 3];
  constructor(private serviceBase1: EwoService, private service: BaseService, public formBuilder: FormBuilder) { super(serviceBase1); }

  ngOnInit() {
    this.service.entity = this.entityapi = 'decont';
    this.validationform = this.formBuilder.group({
      id: [''],
      year: ['', [Validators.required]],
      paymentOrderId: ['', [Validators.required]],
      paymentOrderName: ['', [Validators.required]],
      costClaim: ['', [Validators.required]],
      date: ['', [Validators.required]],
      brandId: ['', [Validators.required]],
      brandName: ['', [Validators.required]],
      payment: ['', [Validators.required]],
      acc: ['', [Validators.required]],
      analytic: ['', [Validators.required]],
      acc2: ['', [Validators.required]],
      policy: ['', [Validators.required]],
      forbearance: ['', [Validators.required]],
      analytic2: ['', [Validators.required]],
      date2: ['', [Validators.required]],
      date2Start: ['', [Validators.required]],
      counter: ['', [Validators.required]],
      invoice: ['', [Validators.required]],
      invoiceDate: ['', [Validators.required]],
      partId: ['', [Validators.required]],
      chargeCenter: ['', [Validators.required]],
      order: ['', [Validators.required]],
      payment2: ['', [Validators.required]],
      paymentForeignCurrency: ['', [Validators.required]],
      docType: ['', [Validators.required]],
      partName: ['', [Validators.required]],
      CIG: ['', [Validators.required]],
      vatPercent: ['', [Validators.required]],
      taxBase: ['', [Validators.required]],
      currency: ['', [Validators.required]],
      exgRate: ['', [Validators.required]],
      fiscalCode: ['', [Validators.required]],
      vatRecovery: ['', [Validators.required]],
      dateStart: ['', [Validators.required]],
      dateEnd: ['', [Validators.required]],
      operationType: ['', [Validators.required]],
      inventory1: ['', [Validators.required]],
      inventory2: ['', [Validators.required]],

    });

    this.service.findAllItems().subscribe((all) => {
      this.list = all;
      console.log(this.list);
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
    this.item = new DecontCls();

    this.displayDialog1 = true;
  }

  edit() {
    if (!this.validSelection(this.selectedItems))
      return;

    this.submitted = false;
    this.item = JSON.parse(JSON.stringify(this.selectedItems)) as DecontCls;
    this.validationform.patchValue(this.item);
    // this.checkedNonStock();
    this.displayDialog1 = true;
  }

  onRowDblClick(event, data) {
    this.selectedItems = data;
    // this.checkedNonStock();
    console.log(this.form.nonstock.value);
    // console.log(this.checkedNonStock());
    this.edit();
  }

  onSubmit(values: object) {
    (values['id']) ? this.updateItem(values) : this.createItem(values);
    this.submitted = true;
  }

  createItem(data) {

    this.item = data;
    this.item['id'] = this.guid();
    this.item['state'] = this.selection;



    if (this.validationform) {

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

    if (this.validationform) {

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

  handleExcludedDeclaration394($event) {
    if ($event.target.checked) {
      this.form.excludedDeclaration394.patchValue(1);
    } else if (this.form.excludedDeclaration394.value === undefined || null) { this.form.excludedDeclaration394.patchValue(0); }
    else if (this.form.excludedDeclaration394.value === true && $event.target.checked === false) { this.form.excludedDeclaration394.patchValue(0) }

    console.log('$event.target.checked :' + $event.target.checked);
    console.log('$event.target.value :' + $event.target.value);
    console.log('this.form.excludedDeclaration394.value :' + this.form.excludedDeclaration394.value);
    // console.log('check :' + this.check);
  }

  checkedExcludedDeclaration394(): boolean {
    if (this.form.excludedDeclaration394.value) {
      return true;
    } else if (this.form.excludedDeclaration394.value === undefined) {
      return false;
    } else if (this.form.excludedDeclaration394.value === null) {
      return false;
    } else if (!this.form.excludedDeclaration394.value) {
      return false;
    }
  }

  handleVatRecovery($event) {
    if ($event.target.checked) {
      this.form.vatRecovery.patchValue(1);
    } else if (this.form.vatRecovery.value === undefined || null) { this.form.vatRecovery.patchValue(0); }
    else if (this.form.vatRecovery.value === true && $event.target.checked === false) { this.form.vatRecovery.patchValue(0) }

    console.log('$event.target.checked :' + $event.target.checked);
    console.log('$event.target.value :' + $event.target.value);
    console.log('this.form.vatRecovery.value :' + this.form.vatRecovery.value);
    // console.log('check :' + this.check);
  }

  checkedVatRecovery(): boolean {
    if (this.form.vatRecovery.value) {
      return true;
    } else if (this.form.vatRecovery.value === undefined) {
      return false;
    } else if (this.form.vatRecovery.value === null) {
      return false;
    } else if (!this.form.vatRecovery.value) {
      return false;
    }
  }

  handleIncomes($event) {
  }

  handleGiver($event) {
  }

  // select($event) {
  //   this.selection = $event.target.value;
  //   // this.toggleBtns = !this.toggleBtns;
  //   console.log(this.selection);
  // }
  // toggleBtn1() {
  //   this.toggle1 = true;
  //   this.toggle2 = false;

  // }
  // toggleBtn2() {
  //   this.toggle2 = true;
  //   this.toggle1 = false;

  // }

  // dummy functions

  display() {
    console.log('this is the Vizualizare button');
  }

  list1() {
    console.log('this is Lista button');
  }

  parcAuto() {
    console.log('this is Parc auto');
  }


}
