import { Component, OnInit, ViewChild } from '@angular/core';

import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import { Base } from '../../_ewo/base';
import { EwoColumn, EwoProperty } from '../../_ewo/model/model';
import { SelectItem, LazyLoadEvent, FilterMetadata } from 'primeng/components/common/api';

import { BaseService as EwoService } from '../../_ewo/service/service';

import { BonMaterialCls } from './bonmaterial.model';

import { BaseService } from './../../_services/base.service';
import { TabsetComponent } from 'ngx-bootstrap/tabs';

@Component({
  selector: 'app-bonmaterial',
  templateUrl: './bonmaterial.component.html',
  styleUrls: ['./bonmaterial.component.scss'],
  providers: [EwoService, BaseService]
})
export class BonmaterialComponent extends Base implements OnInit {
  @ViewChild('tabset', { static: false }) tabset: TabsetComponent;

  breadCrumbItems: Array<{}>;

  list: BonMaterialCls[];
  columns: any[];
  item: BonMaterialCls = new BonMaterialCls();
  selectedItems: BonMaterialCls[];
  value: Date;

  // checkedNonStock(): boolean = false;
  // checkedBlocked(): boolean = false;

  listpartner: SelectItem[];
  validationform: FormGroup;
  submitted: boolean;
  nonstock: boolean;
  blocked: boolean;


  constructor(private serviceBase1: EwoService, private service: BaseService, public formBuilder: FormBuilder) { super(serviceBase1); }

  ngOnInit() {
    this.service.entity = this.entityapi = 'bonmaterial';
    this.breadCrumbItems = [{ label: 'Dashboard', path: '/' }, { label: 'Dev', path: '/' }, { label: 'Primeng module demo', path: '/', active: true }];

    this.validationform = this.formBuilder.group({
      id: [''],
      pwd: ['', [Validators.required]],
      borderou: ['', [Validators.required]],
      administration: ['', [Validators.required]],
      defalcator: [true, [Validators.required]],
      accesoriu: [false, [Validators.required]],
      bminit: ['', [Validators.required]],
      docno: ['', [Validators.required]],
      docdate: ['', [Validators.required]],
      order: ['', [Validators.required]],
      auto: ['', [Validators.required]],
      desc1: ['', [Validators.required]],
      matcode: ['', [Validators.required]],
      desc2: ['', [Validators.required]],
      matcodeprovider: ['', [Validators.required]],
      um: ['', [Validators.required]],
      currentstock: ['', [Validators.required]],
      reservede: ['', [Validators.required]],
      reservedi: ['', [Validators.required]],
      matacc: ['', [Validators.required]],
      correspondentacc: ['', [Validators.required]],
      acccenter: ['', [Validators.required]],
      intaccadm: ['', [Validators.required]],
      qtytotal: ['', [Validators.required]],
      qtyticket: ['', [Validators.required]],
      qtydelivered: ['', [Validators.required]],
      partnercode: ['', [Validators.required]],
      nrinv1: ['', [Validators.required]],
      // nrinv2: ['', [Validators.required]],

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
    this.item = new BonMaterialCls();

    this.displayDialog1 = true;
  }

  edit() {
    if (!this.validSelection(this.selectedItems))
      return;

    this.submitted = false;
    this.item = JSON.parse(JSON.stringify(this.selectedItems)) as BonMaterialCls;
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

  handleDefalcator($event) {
  }
  handleAccesoriu($event) {
  }






















}
