import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import { Base } from '../../_ewo/base';
import { EwoColumn, EwoProperty } from '../../_ewo/model/model';
import { SelectItem, LazyLoadEvent, FilterMetadata } from 'primeng/components/common/api';

import { BaseService as EwoService } from '../../_ewo/service/service';

import { BtInventarCls } from './btinventar.model';

import { BaseService } from './../../_services/base.service';
import { TabsetComponent } from 'ngx-bootstrap/tabs'

@Component({
  selector: 'app-btinventar',
  templateUrl: './btinventar.component.html',
  styleUrls: ['./btinventar.component.scss'],
  providers: [EwoService, BaseService]
})
export class BtinventarComponent extends Base implements OnInit {
  @ViewChild('tabset', { static: false }) tabset: TabsetComponent;
  breadCrumbItems: Array<{}>;
  selection1: string;
  selection2: string;

  list: BtInventarCls[];
  columns: any[];
  item: BtInventarCls = new BtInventarCls();
  selectedItems: BtInventarCls[];
  value: Date;
  listpartner: SelectItem[];
  validationform: FormGroup;
  submitted: boolean;

  constructor(private serviceBase1: EwoService, private service: BaseService, public formBuilder: FormBuilder) { super(serviceBase1); }

  ngOnInit() {
    this.service.entity = this.entityapi = 'btinventar';
    this.breadCrumbItems = [{ label: 'Dashboard', path: '/' }, { label: 'Dev', path: '/' }, { label: 'Primeng module demo', path: '/', active: true }];

    this.validationform = this.formBuilder.group({
      id: [''],
      selection1: [''],
      selection2: [''],
      // employeeEmployee: ['', [Validators.required]],
      // employeeAdm: ['', [Validators.required]],
      // admAdm: ['', [Validators.required]],
      // admEmployee: ['', [Validators.required]],
      // onePositionBt: ['', [Validators.required]],
      // morePosBt: ['', [Validators.required]],
      reimbursementAdm98: ['', [Validators.required]],
      docNo: ['', [Validators.required]],

      obs: ['', [Validators.required]],

      brand: ['', [Validators.required]],
      goneToo: ['', [Validators.required]],
      nameField: ['', [Validators.required]],
      adm1: ['', [Validators.required]],
      retainWage: ['', [Validators.required]],
      admInputField: ['', [Validators.required]],

      _nameField: ['', [Validators.required]],
      _adm: ['', [Validators.required]],
      _admInputField: ['', [Validators.required]],
      _brand: ['', [Validators.required]],


      searchObj: ['', [Validators.required]],

      docType: ['', [Validators.required]],
      inventoryNo: ['', [Validators.required]],
      docDate: ['', [Validators.required]],
      bt: ['', [Validators.required]],
      noDocOut: ['', [Validators.required]],
      // _noDocOut: ['', [Validators.required]],
      name: ['', [Validators.required]],
      matCode: ['', [Validators.required]],
      qty: ['', [Validators.required]],
      chargeCenter: ['', [Validators.required]],
      counter: ['', [Validators.required]],
      _bt: ['', [Validators.required]]
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
    this.item = new BtInventarCls();

    this.displayDialog1 = true;
  }

  edit() {
    if (!this.validSelection(this.selectedItems))
      return;

    this.submitted = false;
    this.item = JSON.parse(JSON.stringify(this.selectedItems)) as BtInventarCls;
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
    this.item['selection1'] = this.selection1;
    this.item['selection2'] = this.selection2;


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

  handleWaste($event) {
    if ($event.target.checked) {
      this.form.waste.patchValue(1);
    } else if (this.form.waste.value === undefined || null) { this.form.waste.patchValue(0); }
    else if (this.form.waste.value === true && $event.target.checked === false) { this.form.waste.patchValue(0) }

    console.log('$event.target.checked :' + $event.target.checked);
    console.log('$event.target.value :' + $event.target.value);
    console.log('this.form.waste.value :' + this.form.waste.value);
    // console.log('check :' + this.check);
  }

  // dummy functions
  help() {
    console.log('help');
  }

  searchEmployee() {
    console.log('cautare angajat predator');
  }

  _searchEmployee() {
    console.log('cautare angajat primitor');
  }

  searchAdm() {
    console.log('cautare gestiune predator');
  }

  _searchAdm() {
    console.log('cautare gestiune primitor');
  }

  searchByName() {
    console.log('cautare dupa denumire');
  }

  handleReimbursementAdm98($event) {
    if ($event.target.checked) {
      this.form.reimbursementAdm98.patchValue(1);
    } else if (this.form.reimbursementAdm98.value === undefined || null) { this.form.reimbursementAdm98.patchValue(0); }
    else if (this.form.reimbursementAdm98.value === true && $event.target.checked === false) { this.form.reimbursementAdm98.patchValue(0) }

    console.log('$event.target.checked :' + $event.target.checked);
    console.log('$event.target.value :' + $event.target.value);
    console.log('this.form.reimbursementAdm98.value :' + this.form.reimbursementAdm98.value);
    // console.log('check :' + this.check);
  }
  checkedReimbursementAdm98(): boolean {
    if (this.form.reimbursementAdm98.value) {
      return true;
    } else if (this.form.reimbursementAdm98.value === undefined) {
      return false;
    } else if (this.form.reimbursementAdm98.value === null) {
      return false;
    } else if (!this.form.reimbursementAdm98.value) {
      return false;
    }
  }

  handleGoneToo($event) {
    if ($event.target.checked) {
      this.form.goneToo.patchValue(1);
    } else if (this.form.goneToo.value === undefined || null) { this.form.goneToo.patchValue(0); }
    else if (this.form.goneToo.value === true && $event.target.checked === false) { this.form.goneToo.patchValue(0) }

    console.log('$event.target.checked :' + $event.target.checked);
    console.log('$event.target.value :' + $event.target.value);
    console.log('this.form.goneToo.value :' + this.form.goneToo.value);
    // console.log('check :' + this.check);
  }
  checkedGoneToo(): boolean {
    if (this.form.goneToo.value) {
      return true;
    } else if (this.form.goneToo.value === undefined) {
      return false;
    } else if (this.form.goneToo.value === null) {
      return false;
    } else if (!this.form.goneToo.value) {
      return false;
    }
  }

  handleRetainWage($event) {
    if ($event.target.checked) {
      this.form.retainWage.patchValue(1);
    } else if (this.form.retainWage.value === undefined || null) { this.form.retainWage.patchValue(0); }
    else if (this.form.retainWage.value === true && $event.target.checked === false) { this.form.retainWage.patchValue(0) }

    console.log('$event.target.checked :' + $event.target.checked);
    console.log('$event.target.value :' + $event.target.value);
    console.log('this.form.retainWage.value :' + this.form.retainWage.value);
    // console.log('check :' + this.check);
  }
  checkedRetainWage(): boolean {
    if (this.form.retainWage.value) {
      return true;
    } else if (this.form.retainWage.value === undefined) {
      return false;
    } else if (this.form.retainWage.value === null) {
      return false;
    } else if (!this.form.retainWage.value) {
      return false;
    }
  }

  select1($event) {
    this.selection1 = $event.target.value;
    console.log(this.selection1);
  }

  select2($event) {
    this.selection2 = $event.target.value;
    console.log(this.selection2);
  }




  // class end
}
