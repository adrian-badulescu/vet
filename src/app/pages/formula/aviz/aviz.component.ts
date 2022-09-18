import { async } from '@angular/core/testing';
// import { AvizdCls } from './../aviz copy/aviz.model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import { Base } from '../../_ewo/base';
import { EwoColumn, EwoProperty } from '../../_ewo/model/model';
import { SelectItem, LazyLoadEvent, FilterMetadata } from 'primeng/components/common/api';

import { BaseService as EwoService } from '../../_ewo/service/service';

import { AvizCls, AvizdCls } from './aviz.model';
import { AvizService } from './aviz.service';
import { BaseService } from './../../_services/base.service';
import { reject } from 'q';

@Component({
  templateUrl: 'aviz.component.html',
  providers: [EwoService, BaseService, AvizService]
})
export class AvizComponent extends Base implements OnInit {

  breadCrumbItems: Array<{}>;

  Tva: Array<number> = [5, 19];
  Type: Array<string> = ['A', 'B', 'C', '...'];
  Administration: Array<string> = ['A', 'B', 'C', '...'];
  currency: Array<{}> = [
    {label: 'USD', value: 'USD'},
    {label: 'EURO', value: 'EUR'},
    {label: 'Deutsche Mark', value: 'DM'}
  ];
  language: Array<{}> = [
    {label: 'Romana', value: 'ro'},
    {label: 'Americana', value: 'en'},
    {label: 'Franceza', value: 'fr'}
  ]; 

  list: AvizCls[];
  columns: any[];
  item: AvizCls;
  selectedItems: AvizCls[];
  value: Date;

  article: AvizdCls;
  article_org: AvizdCls;
  invoicexarticles: Array<AvizdCls> = [];
  invoicexarticles_deleted: Array<AvizdCls> = [];

  listpartner: SelectItem[];
  validationform: FormGroup;
  submitted: boolean;

  constructor(private serviceBase1: EwoService, private service: BaseService, public formBuilder: FormBuilder) {
    super(serviceBase1);
    
  }

  ngOnInit() {
    this.service.entity = this.entityapi = 'aviz';
    
    this.breadCrumbItems = [{ label: 'Dashboard', path: '/' }, { label: 'Dev', path: '/' }, { label: 'Primeng module demo', path: '/', active: true }];

    this.validationform = this.formBuilder.group({
      id: [''],
      administration: ['', [Validators.required]],
      prod: ['', [Validators.required]],
      type: ['', [Validators.required]],
      um: ['', [Validators.required]],
      qty: ['', [Validators.required]],
      price: ['', [Validators.required]],
      tva: ['', [Validators.required]],
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
    this.service.findAllItemsEntity('avizd').subscribe(data => {
      this.invoicexarticles = data;
      console.log(data);
    });
    super.ngOnInit();
    this.service.guid();
  }


  add() {
    this.submitted = false;
    this.validationform.reset();
    this.item = new AvizCls();

    this.displayDialog1 = true;
  }

  edit() {
    if (!this.validSelection(this.selectedItems))
      return;

    this.submitted = false;
    this.item = JSON.parse(JSON.stringify(this.selectedItems)) as AvizCls;
    this.validationform.patchValue(this.item);

    let self = this;
    this.service.findAllItemsEntity('avizd').subscribe(data => {

      data = data.filter(function (data) {
        console.log(data);
        return data['avizid'] == self.item['id'];

      });

      self.invoicexarticles = data;
      self.displayDialog1 = true;
    });
  }

  onRowDblClick(event, data) {
    this.selectedItems = data;
    this.edit();
  }

  onSubmit(values: object) {
    (values['id']) ? this.updateItem(values) : this.createItem(values);
    console.log(values);
    this.submitted = true;

    //save articles
    for (var key in this.invoicexarticles) {
      if (this.invoicexarticles[key]['state'] == 'add') {
        delete this.invoicexarticles[key]['state'];
        this.service._createItemEntity('avizd', this.invoicexarticles[key]).subscribe(data => {
        });
      }
      if (this.invoicexarticles[key]['state'] == 'edit') {
        console.log(this.invoicexarticles);
        delete this.invoicexarticles[key]['state'];
        this.service.updateItemEntity('avizd', this.invoicexarticles[key]['id'], this.invoicexarticles[key]).subscribe(data => {
        });
      }
    }
    for (var key in this.invoicexarticles_deleted) {
      this.service.deleteItemEntity('avizd', this.invoicexarticles[key]['id']).subscribe(data => {
      });
    }
  }

  addNewArticleRow() {
    this.item['id'] = this.guid();
    // let itemId = new Promise((resolve, reject) => {
    //   return this.item.id;
    // });
    // let resp = await itemId;
    this.invoicexarticles.push({
      id: this.service.guid(),
      avizid: this.item.id,
      cif: '',
      issuedate: null,
      duedate: null,
      serialnumber: '',
      currency: '',
      language: '',
      state: 'add'
    });
  }
  createItem(data) {

    this.item = data;
    // this.item['id'] = this.service.guid();
    
    //created_at: this.currentDate.getDate() + '/' + this.currentDate.getMonth() + '/' + this.currentDate.getFullYear()

    if (this.validationform.valid) {

      this.service._createItem(this.item).subscribe((data: any) => {

        this.list.unshift(this.item);
        this.validationform.reset();
        // this.f();
       
        this.item = null;
        this.selectedItems = null;
        this.displayDialog1 = false;
      });

    }

  }
  // async f () {

  //   return this.xx = await this.item['id'];
  // }
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

  // async avzid() {
  //   return this.item.id;
  // }


  onRowEditInit(item: AvizdCls) {
    this.article_org = JSON.parse(JSON.stringify(item));
  }

  onRowEditSave(item) {
    if (item) {

      for (var key in this.invoicexarticles) {
        if (this.invoicexarticles[key]['id'] === item.id)
          this.invoicexarticles[key] = item;

        if (this.invoicexarticles[key]['state'] != 'add')
          this.invoicexarticles[key]['state'] = 'edit';
      }
      delete this.article_org;
      console.log(this.invoicexarticles[key]);
    }
  }

  onRowEditCancel(item: AvizdCls, index: number) {

    for (var key in this.invoicexarticles) {
      if (this.invoicexarticles[key]['id'] == this.article_org['id'])
        this.invoicexarticles[key] = this.article_org;
    }
    delete this.article_org;
  }

  onRowDelete(article) {
    this.invoicexarticles_deleted.push(article);

    for (var key in this.invoicexarticles) {
      if (this.invoicexarticles[key]['id'] == article['id'])
        this.invoicexarticles.splice(parseInt(key), 1);
    }
  }



}