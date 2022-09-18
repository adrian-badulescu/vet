import { Component, OnInit, ViewChild } from '@angular/core';
import { Base } from '../../_ewo/base';
import { EwoColumn, EwoProperty } from '../../_ewo/model/model';
import { SelectItem, LazyLoadEvent, FilterMetadata } from 'primeng/components/common/api';

import { BaseService as EwoService } from '../../_ewo/service/service';

import { PaybuyCls } from './paybuy.model';

import { BaseService } from '../../_services/base.service';
import { TabsetComponent } from 'ngx-bootstrap/tabs'
import { Validators, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-paybuy',
  templateUrl: './paybuy.component.html',
  styleUrls: ['./paybuy.component.scss'],
  providers: [EwoService, BaseService]
})
export class PaybuyComponent extends Base implements OnInit {
  @ViewChild('tabset', { static: false }) tabset: TabsetComponent;
  breadCrumbItems: Array<{}>;
  selection: string;


  list: PaybuyCls[];
  columns: any[];
  item: PaybuyCls = new PaybuyCls();
  selectedItems: PaybuyCls[];
  value: Date;
  listpartner: SelectItem[];
  validationform: FormGroup;
  submitted: boolean;

  Currency: Array<string> = ['A', 'B', 'C'];
  Variety: Array<string> = ['A', 'B', 'C'];
  constructor(private serviceBase1: EwoService, private service: BaseService, public formBuilder: FormBuilder) { super(serviceBase1); }

  ngOnInit() {
    this.service.entity = this.entityapi = 'paybuy';
    this.validationform = this.formBuilder.group({
      id: [''],
      name: ['', [Validators.required]],
      number: ['', [Validators.required]],
      bankAcc: ['', [Validators.required]],
      dateBankStatement: ['', [Validators.required]],
      radio: ['', [Validators.required]],
      // payments: ['', [Validators.required]],
      bankAcc2: ['', [Validators.required]],
      dateBankStatement2: ['', [Validators.required]],
      exchangeRate: ['', [Validators.required]],
      amountRon: ['', [Validators.required]],
      amountForeignCurrency: ['', [Validators.required]],
      currency: ['', [Validators.required]],
      analytic: ['', [Validators.required]],
      doc: ['', [Validators.required]],
      income: ['', [Validators.required]],
      incomeForeignCurrency: ['', [Validators.required]],
      payments2: ['', [Validators.required]],
      paymentsForeignCurrency: ['', [Validators.required]],
      acc: ['', [Validators.required]],
      CIG: ['', [Validators.required]],
      chargeCenter: ['', [Validators.required]],
      account: ['', [Validators.required]],
      analytic2: ['', [Validators.required]],
      policy: ['', [Validators.required]],
      fobearance: ['', [Validators.required]],
      date: ['', [Validators.required]],
      startDate: ['', [Validators.required]],
      counter: ['', [Validators.required]],
      order: ['', [Validators.required]],
      invoice: ['', [Validators.required]],
      paymentRemainder: ['', [Validators.required]],
      invoiceDate: ['', [Validators.required]],
      invoiceType: ['', [Validators.required]],
      excludedDeclaration394: ['', [Validators.required]],
      docType: ['', [Validators.required]],
      partId: ['', [Validators.required]],
      partName: ['', [Validators.required]],
      O_payment: ['', [Validators.required]],
      O_payment2: ['', [Validators.required]],
      brand: ['', [Validators.required]],
      brand2: ['', [Validators.required]],
      brand3: ['', [Validators.required]],
      sr_cec: ['', [Validators.required]],
      nr_cec: ['', [Validators.required]],
      vatPercent: ['', [Validators.required]],
      taxBase: ['', [Validators.required]],
      vatIncomes: ['', [Validators.required]],
      fiscalCode: ['', [Validators.required]],
      startDate2: ['', [Validators.required]],
      endDate: ['', [Validators.required]],
      opsType: ['', [Validators.required]],
      inventoryNr: ['', [Validators.required]],
      inventoryNr2: ['', [Validators.required]]
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
    this.item = new PaybuyCls();

    this.displayDialog1 = true;
  }

  edit() {
    if (!this.validSelection(this.selectedItems))
      return;

    this.submitted = false;
    this.item = JSON.parse(JSON.stringify(this.selectedItems)) as PaybuyCls;
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

  handleVatIncomes($event) {
    if ($event.target.checked) {
      this.form.vatIncomes.patchValue(1);
    } else if (this.form.vatIncomes.value === undefined || null) { this.form.vatIncomes.patchValue(0); }
    else if (this.form.vatIncomes.value === true && $event.target.checked === false) { this.form.vatIncomes.patchValue(0) }

    console.log('$event.target.checked :' + $event.target.checked);
    console.log('$event.target.value :' + $event.target.value);
    console.log('this.form.vatIncomes.value :' + this.form.vatIncomes.value);
    // console.log('check :' + this.check);
  }

  checkedVatIncomes(): boolean {
    if (this.form.vatIncomes.value) {
      return true;
    } else if (this.form.vatIncomes.value === undefined) {
      return false;
    } else if (this.form.vatIncomes.value === null) {
      return false;
    } else if (!this.form.vatIncomes.value) {
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
