import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import { Base } from '../../_ewo/base';
import { EwoColumn, EwoProperty } from '../../_ewo/model/model';
import { SelectItem, LazyLoadEvent, FilterMetadata } from 'primeng/components/common/api';

import { BaseService as EwoService } from '../../_ewo/service/service';

import {
  PartenerCls, PartenerdDivisionCls, PartnerContactCls
  , PartnerGeneralCls, PartnerAccountsCls, PartnerResponsabilitiesCls
} from './partener.model';
import { PartenerService } from './partener.service';
import { BaseService } from './../../_services/base.service';

@Component({
  templateUrl: 'partener.component.html',
  providers: [EwoService, BaseService, PartenerService]
})
export class PartenerComponent extends Base implements OnInit {

  breadCrumbItems: Array<{}>;

  list: PartenerCls[];
  columns: any[];
  item: PartenerCls = new PartenerCls();
  selectedItems: PartenerCls[];
  value: Date;
  PartnerType: Array<string> = ['A', 'B', 'C', 'D', '...'];

  partDiv: PartenerdDivisionCls;
  partDiv_org: PartenerdDivisionCls;
  partenerxdivizie: Array<PartenerdDivisionCls> = [];
  partenerxdivizie_deleted: Array<PartenerdDivisionCls> = [];

  partContact: PartnerContactCls;
  partContact_org: PartnerContactCls;
  partenerxcontact: Array<PartnerContactCls> = [];
  partenerxcontact_deleted: Array<PartnerContactCls> = [];

  partAcc: PartnerAccountsCls;
  partAcc_org: PartnerAccountsCls;
  partenerxaccount: Array<PartnerAccountsCls> = [];
  partenerxaccount_deleted: Array<PartnerAccountsCls> = [];

  partResp: PartnerResponsabilitiesCls;
  partResp_org: PartnerResponsabilitiesCls;
  partenerxresponsability: Array<PartnerResponsabilitiesCls> = [];
  partenerxresponsability_deleted: Array<PartnerResponsabilitiesCls> = [];

  partGeneral: PartnerGeneralCls;
  partGeneral_org: PartnerGeneralCls;
  partenerxgeneral: Array<PartnerGeneralCls> = [];
  partenerxgeneral_deleted: Array<PartnerGeneralCls> = [];


  listpartner: SelectItem[];
  validationform: FormGroup;
  submitted: boolean;

  constructor(private serviceBase1: EwoService, private service: BaseService, public formBuilder: FormBuilder) {
    super(serviceBase1);
  }

  ngOnInit() {
    this.service.entity = this.entityapi = 'partener';
    this.breadCrumbItems = [{ label: 'Dashboard', path: '/' }, { label: 'Dev', path: '/' }, { label: 'Primeng module demo', path: '/', active: true }];

    this.validationform = this.formBuilder.group({
      id: [''],
      name: ['', [Validators.required]],
      code: ['', [Validators.required]],
      cui: ['', [Validators.required]],
      fiscalAttr: ['', [Validators.required]],
      regNumber: ['', [Validators.required]],
      capSoc: ['', [Validators.required]],
      partnerType: ['', [Validators.required]],
      web: ['', [Validators.required]]
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
    this.item = new PartenerCls();

    this.displayDialog1 = true;
  }

  edit() {
    if (!this.validSelection(this.selectedItems))
      return;

    this.submitted = false;
    this.item = JSON.parse(JSON.stringify(this.selectedItems)) as PartenerCls;
    this.validationform.patchValue(this.item);

    let self = this;
    this.service.findAllItemsEntity('partenerxdivizie').subscribe(data => {

      data = data.filter(function (entry) {
        return entry['partenerid'] = self.item['id'];
      });

      self.partenerxdivizie = data;
      self.displayDialog1 = true;
    });
  }

  onRowDblClick(event, data) {
    this.selectedItems = data;
    this.edit();
  }

  onSubmit(values: object) {
    (values['id']) ? this.updateItem(values) : this.createItem(values);
    this.submitted = true;

    // save articles partenerxdivizie
    // tslint:disable-next-line: forin
    for (var key in this.partenerxdivizie) {
      if (this.partenerxdivizie[key]['state'] == 'add') {
        delete this.partenerxdivizie[key]['state'];
        this.service._createItemEntity('partenerxdivizie', this.partenerxdivizie[key]).subscribe(data => {
        });
      }
      if (this.partenerxdivizie[key]['state'] == 'edit') {
        console.log(this.partenerxdivizie);
        delete this.partenerxdivizie[key]['state'];
        this.service.updateItemEntity('partenerxdivizie', this.partenerxdivizie[key]['id'], this.partenerxdivizie[key]).subscribe(data => {
        });
      }
    }
    // tslint:disable-next-line: forin
    for (var key in this.partenerxdivizie_deleted) {
      this.service.deleteItemEntity('partenerxdivizie', this.partenerxdivizie[key]['id']).subscribe(data => {
      });
    }

    // save articles partenerxcontact
    // tslint:disable-next-line: forin
    for (var key in this.partenerxcontact) {
      if (this.partenerxcontact[key]['state'] == 'add') {
        delete this.partenerxcontact[key]['state'];
        this.service._createItemEntity('partenerxcontact', this.partenerxcontact[key]).subscribe(data => {
        });
      }
      if (this.partenerxcontact[key]['state'] == 'edit') {
        console.log(this.partenerxcontact);
        delete this.partenerxcontact[key]['state'];
        this.service.updateItemEntity('partenerxcontact', this.partenerxcontact[key]['id'], this.partenerxcontact[key]).subscribe(data => {
        });
      }
    }
    // tslint:disable-next-line: forin
    for (var key in this.partenerxcontact_deleted) {
      this.service.deleteItemEntity('partenerxcontact', this.partenerxcontact[key]['id']).subscribe(data => {
      });
    }

    // save articles partenerxaccount
    // tslint:disable-next-line: forin
    for (var key in this.partenerxaccount) {
      if (this.partenerxaccount[key]['state'] == 'add') {
        delete this.partenerxaccount[key]['state'];
        this.service._createItemEntity('partenerxaccount', this.partenerxaccount[key]).subscribe(data => {
        });
      }
      if (this.partenerxaccount[key]['state'] == 'edit') {
        console.log(this.partenerxaccount);
        delete this.partenerxaccount[key]['state'];
        this.service.updateItemEntity('partenerxaccount', this.partenerxaccount[key]['id'], this.partenerxaccount[key]).subscribe(data => {
        });
      }
    }
    // tslint:disable-next-line: forin
    for (var key in this.partenerxaccount_deleted) {
      this.service.deleteItemEntity('partenerxaccount', this.partenerxaccount[key]['id']).subscribe(data => {
      });
    }

    // save articles partenerxresponsability
    // tslint:disable-next-line: forin
    for (var key in this.partenerxresponsability) {
      if (this.partenerxresponsability[key]['state'] == 'add') {
        delete this.partenerxresponsability[key]['state'];
        this.service._createItemEntity('partenerxresponsability', this.partenerxresponsability[key]).subscribe(data => {
        });
      }
      if (this.partenerxresponsability[key]['state'] == 'edit') {
        console.log(this.partenerxresponsability);
        delete this.partenerxresponsability[key]['state'];
        this.service.updateItemEntity('partenerxresponsability', this.partenerxresponsability[key]['id'], this.partenerxresponsability[key]).subscribe(data => {
        });
      }
    }
    // tslint:disable-next-line: forin
    for (var key in this.partenerxresponsability_deleted) {
      this.service.deleteItemEntity('partenerxresponsability', this.partenerxresponsability[key]['id']).subscribe(data => {
      });
    }

    // save articles partenerxgeneral
    // tslint:disable-next-line: forin
    for (var key in this.partenerxgeneral) {
      if (this.partenerxgeneral[key]['state'] == 'add') {
        delete this.partenerxgeneral[key]['state'];
        this.service._createItemEntity('partenerxgeneral', this.partenerxgeneral[key]).subscribe(data => {
        });
      }
      if (this.partenerxgeneral[key]['state'] == 'edit') {
        console.log(this.partenerxgeneral);
        delete this.partenerxgeneral[key]['state'];
        this.service.updateItemEntity('partenerxgeneral', this.partenerxgeneral[key]['id'], this.partenerxgeneral[key]).subscribe(data => {
        });
      }
    }
    // tslint:disable-next-line: forin
    for (var key in this.partenerxgeneral_deleted) {
      this.service.deleteItemEntity('partenerxgeneral', this.partenerxgeneral[key]['id']).subscribe(data => {
      });
    }


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


  addNewArticleDivizie() {
    this.partenerxdivizie.push({
      id: this.service.guid(),
      partnerDivId: this.item.id,
      division: '',
      state: 'add'
    });
  }


  addNewArticleContact() {
    this.partenerxcontact.push({
      id: this.service.guid(),
      partnerContactId: this.item.id,
      surname: '',
      forename: '',
      responsability: '',
      state: 'add'
    });
  }

  addNewArticleConturi() {
    this.partenerxaccount.push({
      id: this.service.guid(),
      partnerAccId: this.item.id,
      account: '',
      bank: '',
      code: '',
      currency: '',
      state: 'add'
    });
  }

  addNewArticleResponsabili() {
    this.partenerxresponsability.push({
      id: this.service.guid(),
      partnerRespId: this.item.id,
      department: '',
      person: '',
      state: 'add'
    });
  }

  addNewArticleGeneral() {
    this.partenerxgeneral.push({
      id: this.service.guid(),
      partnerGenId: this.item.id,
      state: 'add'
    });
  }

  // Div
  onRowEditInitDiv(item: PartenerdDivisionCls) {
    this.partDiv_org = JSON.parse(JSON.stringify(item));
  }
  onRowEditInitContact(item: PartnerContactCls) {
    this.partContact_org = JSON.parse(JSON.stringify(item));
  }
  onRowEditInitAccounts(item: PartnerAccountsCls) {
    this.partAcc_org = JSON.parse(JSON.stringify(item));
  }
  onRowEditInitResp(item: PartnerResponsabilitiesCls) {
    this.partResp_org = JSON.parse(JSON.stringify(item));
  }
  onRowEditInitGen(item: PartnerGeneralCls) {
    this.partGeneral_org = JSON.parse(JSON.stringify(item));
  }

  onRowEditSaveDiv(item) {
    if (item) {

      for (var key in this.partenerxdivizie) {
        if (this.partenerxdivizie[key]['id'] == item.id)
          this.partenerxdivizie[key] = item;

        if (this.partenerxdivizie[key]['state'] != 'add')
          this.partenerxdivizie[key]['state'] = 'edit';
      }
      delete this.partDiv_org;
      console.log(this.partenerxdivizie[key]);
    }
  }

  onRowEditCancelDiv(item: PartenerdDivisionCls, index: number) {

    for (var key in this.partenerxdivizie) {
      if (this.partenerxdivizie[key]['id'] == this.partDiv_org['id'])
        this.partenerxdivizie[key] = this.partDiv_org;
    }
    delete this.partDiv_org;
  }

  onRowDeleteDiv(article) {
    this.partenerxdivizie_deleted.push(article);

    for (var key in this.partenerxdivizie) {
      if (this.partenerxdivizie[key]['id'] == article['id'])
        this.partenerxdivizie.splice(parseInt(key), 1);
    }
  }

  // Contact
  onRowEditSaveContact(item) {
    if (item) {

      for (var key in this.partenerxcontact) {
        if (this.partenerxcontact[key]['id'] == item.id)
          this.partenerxcontact[key] = item;

        if (this.partenerxcontact[key]['state'] != 'add')
          this.partenerxcontact[key]['state'] = 'edit';
      }
      delete this.partContact_org;
      console.log(this.partenerxcontact[key]);
    }
  }

  onRowEditCancelContact(item: PartnerContactCls, index: number) {

    for (var key in this.partenerxcontact) {
      if (this.partenerxcontact[key]['id'] == this.partContact_org['id'])
        this.partenerxcontact[key] = this.partContact_org;
    }
    delete this.partContact_org;
  }

  onRowDeleteContact(article) {
    this.partenerxcontact_deleted.push(article);

    for (var key in this.partenerxcontact) {
      if (this.partenerxcontact[key]['id'] == article['id'])
        this.partenerxcontact.splice(parseInt(key), 1);
    }
  }

  // Accounts
  onRowEditSaveAcc(item) {
    if (item) {

      for (var key in this.partenerxaccount) {
        if (this.partenerxaccount[key]['id'] == item.id)
          this.partenerxaccount[key] = item;

        if (this.partenerxaccount[key]['state'] != 'add')
          this.partenerxaccount[key]['state'] = 'edit';
      }
      delete this.partAcc_org;
      console.log(this.partenerxaccount[key]);
    }
  }

  onRowEditCancelAcc(item: PartnerAccountsCls, index: number) {

    for (var key in this.partenerxaccount) {
      if (this.partenerxaccount[key]['id'] == this.partAcc_org['id'])
        this.partenerxaccount[key] = this.partAcc_org;
    }
    delete this.partAcc_org;
  }

  onRowDeleteAcc(article) {
    this.partenerxaccount_deleted.push(article);

    for (var key in this.partenerxaccount) {
      if (this.partenerxaccount[key]['id'] == article['id'])
        this.partenerxaccount.splice(parseInt(key), 1);
    }
  }

  // Responsability
  onRowEditSaveResp(item) {
    if (item) {

      for (var key in this.partenerxresponsability) {
        if (this.partenerxresponsability[key]['id'] == item.id)
          this.partenerxresponsability[key] = item;

        if (this.partenerxresponsability[key]['state'] != 'add')
          this.partenerxresponsability[key]['state'] = 'edit';
      }
      delete this.partResp_org;
      console.log(this.partenerxresponsability[key]);
    }
  }

  onRowEditCancelResp(item: PartnerResponsabilitiesCls, index: number) {

    for (var key in this.partenerxresponsability) {
      if (this.partenerxresponsability[key]['id'] == this.partResp_org['id'])
        this.partenerxresponsability[key] = this.partResp_org;
    }
    delete this.partResp_org;
  }

  onRowDeleteResp(article) {
    this.partenerxresponsability_deleted.push(article);

    for (var key in this.partenerxresponsability) {
      if (this.partenerxresponsability[key]['id'] == article['id'])
        this.partenerxresponsability.splice(parseInt(key), 1);
    }
  }

  // General
  onRowEditSaveGen(item) {
    if (item) {

      for (var key in this.partenerxgeneral) {
        if (this.partenerxgeneral[key]['id'] == item.id)
          this.partenerxgeneral[key] = item;

        if (this.partenerxgeneral[key]['state'] != 'add')
          this.partenerxgeneral[key]['state'] = 'edit';
      }
      delete this.partGeneral_org;
      console.log(this.partenerxgeneral[key]);
    }
  }

  onRowEditCancelGen(item: PartnerGeneralCls, index: number) {

    for (var key in this.partenerxgeneral) {
      if (this.partenerxgeneral[key]['id'] == this.partGeneral_org['id'])
        this.partenerxgeneral[key] = this.partGeneral_org;
    }
    delete this.partGeneral_org;
  }

  onRowDeleteGen(article) {
    this.partenerxgeneral_deleted.push(article);

    for (var key in this.partenerxgeneral) {
      if (this.partenerxgeneral[key]['id'] == article['id'])
        this.partenerxgeneral.splice(parseInt(key), 1);
    }
  }





}