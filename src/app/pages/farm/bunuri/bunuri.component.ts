import { Component, OnInit, ViewChild } from '@angular/core';
import { Base } from '../../_ewo/base';
import { EwoColumn, EwoProperty } from '../../_ewo/model/model';
import { SelectItem, LazyLoadEvent, FilterMetadata } from 'primeng/components/common/api';

import { BaseService as EwoService } from '../../_ewo/service/service';

import { BunuriCls } from './bunuri.model';

import { BaseService } from './../../_services/base.service';
import { TabsetComponent } from 'ngx-bootstrap/tabs'
import { Validators, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-bunuri',
  templateUrl: './bunuri.component.html',
  styleUrls: ['./bunuri.component.scss'],
  providers: [EwoService, BaseService]
})
export class BunuriComponent extends Base implements OnInit {
  @ViewChild('tabset', { static: false }) tabset: TabsetComponent;
  breadCrumbItems: Array<{}>;
  selection: string;


  list: BunuriCls[];
  columns: any[];
  item: BunuriCls = new BunuriCls();
  selectedItems: BunuriCls[];
  value: Date;
  listpartner: SelectItem[];
  validationform: FormGroup;
  submitted: boolean;
  constructor(private serviceBase1: EwoService, private service: BaseService, public formBuilder: FormBuilder) { super(serviceBase1); }

  ngOnInit() {
    this.service.entity = this.entityapi = 'bunuri';
    this.validationform = this.formBuilder.group({
      id: [''],
      object: ['', [Validators.required]],
      startDate: ['', [Validators.required]],
      startValue: ['', [Validators.required]],
      currentValue: ['', [Validators.required]],
      currentAge: ['', [Validators.required]],
      deprecPeriod: ['', [Validators.required]],
      deprecRate: ['', [Validators.required]]
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
    this.item = new BunuriCls();

    this.displayDialog1 = true;
  }

  edit() {
    if (!this.validSelection(this.selectedItems))
      return;

    this.submitted = false;
    this.item = JSON.parse(JSON.stringify(this.selectedItems)) as BunuriCls;
    this.validationform.patchValue(this.item);
    // this.checkedNonStock();
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
    this.item['state'] = this.selection;



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

  // handleGeneralBudget($event) {
  //   if ($event.target.checked) {
  //     this.form.generalBudget.patchValue(1);
  //   } else if (this.form.generalBudget.value === undefined || null) { this.form.generalBudget.patchValue(0); }
  //   else if (this.form.generalBudget.value === true && $event.target.checked === false) { this.form.generalBudget.patchValue(0) }

  //   console.log('$event.target.checked :' + $event.target.checked);
  //   console.log('$event.target.value :' + $event.target.value);
  //   console.log('this.form.generalBudget.value :' + this.form.generalBudget.value);
  //   // console.log('check :' + this.check);
  // }

  // generalBudget(): boolean {
  //   if (this.form.generalBudget.value) {
  //     return true;
  //   } else if (this.form.generalBudget.value === undefined) {
  //     return false;
  //   } else if (this.form.generalBudget.value === null) {
  //     return false;
  //   } else if (!this.form.generalBudget.value) {
  //     return false;
  //   }
  // }


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








}
