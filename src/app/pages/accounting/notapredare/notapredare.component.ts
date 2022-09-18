import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Location } from "@angular/common";

import { Base } from '../../_ewo/base';
import { EwoColumn, EwoProperty } from '../../_ewo/model/model';
import { SelectItem, LazyLoadEvent, FilterMetadata } from 'primeng/components/common/api';

import { BaseService as EwoService } from '../../_ewo/service/service';

import { NotaPredareCls } from './notapredare.model';

import { BaseService } from './../../_services/base.service';
import { TabsetComponent } from 'ngx-bootstrap/tabs';

@Component({
  selector: 'app-notapredare',
  templateUrl: './notapredare.component.html',
  styleUrls: ['./notapredare.component.scss'],
  providers: [EwoService, BaseService]
})
export class NotapredareComponent extends Base implements OnInit {
  @ViewChild('tabset', { static: false }) tabset: TabsetComponent;
  breadCrumbItems: Array<{}>;

  list: NotaPredareCls[];
  columns: any[];
  item: NotaPredareCls = new NotaPredareCls();
  selectedItems: NotaPredareCls[];
  value: Date;
  radioGrp: string;

  // checkedNonStock(): boolean = false;
  // checkedBlocked(): boolean = false;

  listpartner: SelectItem[];
  validationform: FormGroup;
  submitted: boolean;
  nonstock: boolean;
  blocked: boolean;
  constructor(private location: Location, private serviceBase1: EwoService, private service: BaseService, public formBuilder: FormBuilder) { super(serviceBase1); }

  ngOnInit() {
    this.service.entity = this.entityapi = 'notapredare';
    this.breadCrumbItems = [{ label: 'Dashboard', path: '/' }, { label: 'Dev', path: '/' }, { label: 'Primeng module demo', path: '/', active: true }];

    this.validationform = this.formBuilder.group({
      id: [''],
      pwd: ['', [Validators.required]],
      borderou: ['', [Validators.required]],
      administration: ['', [Validators.required]],

      docNo: ['', [Validators.required]],
      docDate: ['', [Validators.required]],
      order: ['', [Validators.required]],
      intAccAdm: ['', [Validators.required]], // cont intern gestiune
      matCode: ['', [Validators.required]], // cod material
      matAcc: ['', [Validators.required]], // cont material
      correspondentAcc: ['', [Validators.required]], // cont corespondent
      qty: ['', [Validators.required]],
      price: ['', [Validators.required]],
      name: ['', [Validators.required]],
      um: ['', [Validators.required]],

      _intCode: ['', [Validators.required]],
      _matCode: ['', [Validators.required]],
      _matAcc: ['', [Validators.required]],
      _price: ['', [Validators.required]],

      radioGrp: ['', [Validators.required]],

      mainKey: ['', [Validators.required]],
      secKey1: ['', [Validators.required]],
      secKey2: ['', [Validators.required]],



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
    this.item = new NotaPredareCls();

    this.displayDialog1 = true;
  }

  edit() {
    if (!this.validSelection(this.selectedItems))
      return;

    this.submitted = false;
    this.item = JSON.parse(JSON.stringify(this.selectedItems)) as NotaPredareCls;
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
    this.item['radioGrp'] = this.radioGrp;
    //created_at: this.currentDate.getDate() + '/' + this.currentDate.getMonth() + '/' + this.currentDate.getFullYear()

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

  selectRadioBtn($event) {
    this.radioGrp = $event.target.value;
  }







  // dummy functions

  listAdm() {
    console.log('listare borderou');
  }



  // buttons Top, Prev, Next, End etc
  navigatTo(url) {
    this.location.go(url);
  }
  goBack() {
    this.location.back();
  }
  goForward() {
    this.location.forward();
  }
  // ...




  allocateCode() {
    console.log('alocare cod');
  }

  nomen() {
    console.log('incarcare in NOMEN DBF');
  }

  addMat() {
    console.log('adaugare material');
  }

  browse() {
    console.log('BROWSE');
  }























}
