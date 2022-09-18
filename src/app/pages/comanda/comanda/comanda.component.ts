import { Component, OnInit, ViewChildren, QueryList, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


import { Purchaseorder, Purchaseorderitems } from './comanda.model';
import { BaseService } from '../../_services/base.service';

import { idLocale } from 'ngx-bootstrap';
import { JsonPipe } from '@angular/common';

import { ToastModule } from 'primeng/toast';
// import {MessageService} from 'primeng/api';
import { Message } from 'primeng//api';
import { MessageService } from 'primeng/api';
import { UploadOutput, UploadInput, UploadFile, humanizeBytes, UploaderOptions } from 'ngx-uploader';

@Component({
  selector: 'app-comanda',
  templateUrl: './comanda.component.html',
  styleUrls: ['./comanda.component.scss'],
  providers: [MessageService]
})
export class ComandaComponent implements OnInit {
  purchaseorder: Purchaseorder;
  purchaseorders: Array<Purchaseorder> = [];

  orderitems: Purchaseorderitems;
  orderitems_org: Purchaseorderitems;

  purchaseorderitems: Array<Purchaseorderitems> = [];
  purchaseorderitems_deleted: Array<Purchaseorderitems> = [];

  msgs: Message[] = [];

  breadCrumbItems: Array<{}>;

  item: object;
  submitted: boolean;
  term: any;
  _id: string;
  purchaseorderid: string;

  // page number
  page = 1;
  // default page size
  pageSize = 10;

  // start and end index
  startIndex = 1;
  endIndex = 10;
  totalSize = 0;

  paginatedModel: Array<Purchaseorder>;
  validationform: FormGroup;

  currentDate = new Date();

  Ceoid: Array<string> = ['Lolo', 'Biggie', 'Dummytrow'];

  options: UploaderOptions;
  formData: FormData;
  files: UploadFile[];
  uploadInput: EventEmitter<UploadInput>;
  humanizeBytes: Function;
  dragOver: boolean;
  inport: number = 0;


  constructor(private modalService: NgbModal, public formBuilder: FormBuilder, private messageService: MessageService,
    private service: BaseService, private router: Router, private route: ActivatedRoute) {
    this.service.entity = 'purchaseorder';
    this.options = { concurrency: 1, maxUploads: 3 };
    this.files = []; // local uploading files array
    this.uploadInput = new EventEmitter<UploadInput>(); // input events, we use this to emit data to ngx-uploader
    this.humanizeBytes = humanizeBytes;
  }

  ngOnInit() {
    this.breadCrumbItems = [{ label: 'Dashboard', path: '/' }, { label: 'Company', path: '/' }, { label: 'Module', path: '/', active: true }];

    this.validationform = this.formBuilder.group({
      id: [''],
      number: [''],
      internalreference: [''],
      date: [''],
      supplierid: [''],
      suppliercontactid: [''],
      orderdate: [''],
      notes: [''],
      statusid: [''],
      valutaid: [''],
      contractid: [''],
      discountpercent: [''],
      discountreason: [''],
      paymenttermdays: [''],
      deliverylocationid: [''],
      deliverylocationcustom: [''],
      penalties: [''],
      warrantyid: [''],
      offervalidityid: [''],
      reshdid: [''],
      resordid: [''],
      resvizid: [''],
      // generat: [''],
      aquisitionrequestid: [''],
      statusobs: [''],
      statusact: [''],
      data_lansare: [''],
      data_confirmare: [''],
      data_estimata_livrare: [''],
      inport: [''],
      intarziere_comanda: [''],
      continut_comanda: ['']
    });

    this.loadData();
    
    console.log();
  }



  private loadData() {

    this.service.findAllItems().subscribe((data) => {
      this.purchaseorders = data;
      this.startIndex = 0;
      this.endIndex = this.pageSize;
      this.paginatedModel = this.purchaseorders.slice(this.startIndex, this.endIndex);
      this.totalSize = this.purchaseorders.length;
    });

  }

  onSubmit(values: object, form, modal) {

    if (values['id']) {
      this.updateItem(values['id'], values);
    } else {
      this.createItem();
      console.log(values);
    }

    //save articles
    for (var key in this.purchaseorderitems) {
      if (this.purchaseorderitems[key]['state'] == 'add') {
        delete this.purchaseorderitems[key]['state'];
        this.service._createItemEntity('purchaseorderitems', this.purchaseorderitems[key]).subscribe(data => {
        });
      }
      if (this.purchaseorderitems[key]['state'] == 'edit') {
        console.log(this.purchaseorderitems);
        // tslint:disable-next-line: align
        delete this.purchaseorderitems[key]['state'];
        this.service.updateItemEntity('purchaseorderitems', this.purchaseorderitems[key]['id'], this.purchaseorderitems[key]).subscribe(data => {
        });
      }
    }
    for (var key in this.purchaseorderitems_deleted) {
      this.service.deleteItemEntity('purchaseorderitems', this.purchaseorderitems[key]['id']).subscribe(data => {
      });
    }


    this.closeModal(form, modal);


    console.log(this.item);
  }

  get form() {
    return this.validationform.controls;
  }

  handleImport($event) {
    if ($event.target.checked) {
      this.form.inport.patchValue(1);
    } else if (this.form.inport.value === undefined || null ) { this.form.inport.patchValue(0); }
    else if (this.form.inport.value === 1 && $event.target.checked === false) 
    { this.form.inport.patchValue(0) }

    console.log('$event.target.checked :' + $event.target.checked);
    console.log('$event.target.value :' + $event.target.value);
    console.log('this.form.transmis.value :' + this.form.inport.value);
    // console.log('check :' + this.check);
  }
  checkedImport(): boolean {
    if (this.form.inport.value === 1) {
      return true;
    } else if (this.form.inport.value === undefined) {
      return false;
    } else if (this.form.inport.value === null) {
      return false;
    } else if (this.form.inport.value === 0) {
      return false;
    }
  }

  createItem() {

    const id = this.service.guid();
    const number = this.validationform.get('number').value;
    const internalreference = this.validationform.get('internalreference').value;
    const date = this.validationform.get('date').value;
    const supplierid = this.validationform.get('supplierid').value;
    const suppliercontactid = this.validationform.get('suppliercontactid').value;
    const orderdate = this.validationform.get('orderdate').value;
    const notes = this.validationform.get('notes').value;
    const statusid = this.validationform.get('statusid').value;
    const valutaid = this.validationform.get('valutaid').value;
    const contractid = this.validationform.get('contractid').value;
    const discountpercent = this.validationform.get('discountpercent').value;
    const discountreason = this.validationform.get('discountreason').value;
    const paymenttermdays = this.validationform.get('paymenttermdays').value;
    const deliverylocationid = this.validationform.get('deliverylocationid').value;
    const deliverylocationcustom = this.validationform.get('deliverylocationcustom').value;
    const penalties = this.validationform.get('penalties').value;
    const warrantyid = this.validationform.get('warrantyid').value;
    const offervalidityid = this.validationform.get('offervalidityid').value;
    const reshdid = this.validationform.get('reshdid').value;
    const resordid = this.validationform.get('resordid').value;
    const resvizid = this.validationform.get('resvizid').value;
    // const generat = this.validationform.get('generat').value;
    const inport = this.validationform.get('inport').value;
    const aquisitionrequestid = this.validationform.get('aquisitionrequestid').value;
    const statusobs = this.validationform.get('statusobs').value;
    const statusact = this.validationform.get('statusact').value;
    const data_lansare = this.validationform.get('data_lansare').value;
    const data_confirmare = this.validationform.get('data_confirmare').value;
    const data_estimata_livrare = this.validationform.get('data_estimata_livrare').value;
   
    const intarziere_comanda = this.validationform.get('intarziere_comanda').value;
    const continut_comanda = this.validationform.get('continut_comanda').value;

    this.item = {
      id,
      number,
      internalreference,
      date,
      supplierid,
      suppliercontactid,
      orderdate,
      notes,
      statusid,
      valutaid,
      contractid,
      discountpercent,
      discountreason,
      paymenttermdays,
      deliverylocationid,
      deliverylocationcustom,
      penalties,
      warrantyid,
      offervalidityid,
      reshdid,
      resordid,
      resvizid,
      generat: 1,
      aquisitionrequestid,
      statusobs,
      statusact,
      data_lansare,
      data_confirmare,
      data_estimata_livrare,
      inport,
      // ComandaComponent['import'] : typeof ComandaComponent,
      intarziere_comanda,
      continut_comanda
    };

    this.purchaseorder = this.item as Purchaseorder;
    this.loadDataPurchaseorderitems(this.purchaseorder.id);

    if (this.validationform) {

      this.purchaseorders.push(this.purchaseorder);
      this.submitted = true;
      this.totalSize = this.purchaseorders.length + 1;
      this.paginatedModel = this.purchaseorders.slice(this.startIndex, this.endIndex);
      this.service._createItem(this.item).subscribe((data: any) => {
        (data => console.log('Done posting: ' + data));
        
      });
      this.modalService.dismissAll();
    }


    this.loadData();
    console.log(this.item);
  }

  
  getItem(id) {
    this.service.getItem(id).subscribe(data => {
      this.item = data;
      this._id = data.id;
      this.validationform.patchValue(this.item);
    });
  }

  openToAddtModal(content) {

    this.purchaseorder = {
      id: this.service.guid(),
      number: null,
      internalreference: '',
      date: null,
      supplierid: '',
      suppliercontactid: '',
      orderdate: null,
      notes: '',
      statusid: '',
      valutaid: '',
      contractid: '',
      discountpercent: null,
      discountreason: '',
      paymenttermdays: '',
      deliverylocationid: '',
      deliverylocationcustom: '',
      penalties: '',
      warrantyid: '',
      offervalidityid: '',
      reshdid: '',
      resordid: '',
      resvizid: '',
      generat: 1,
      aquisitionrequestid: '',
      statusobs: '',
      statusact: '',
      data_lansare: null,
      data_confirmare: null,
      data_estimata_livrare: null,
      inport: null,
      intarziere_comanda: '',
      continut_comanda: '',
    };

    this.loadDataPurchaseorderitems(this.purchaseorder.id);
    this.openModal(content);
  }


  openToEditModal(content, item) {

    this.purchaseorder = item;
    this.loadDataPurchaseorderitems(this.purchaseorder.id);

    this.validationform.patchValue(item);
    this.openModal(content);
  }


  updateItem(id, item) {
    delete item['id'];
    this.service.updateItem(id, item).subscribe(
      data => {
        this.getItem(id);
        this.loadData();
        item = data;
      });
  }


  deleteItem(id) {
    this.service.deleteItem(id).subscribe(res => {
      this.purchaseorders.splice(id, 1);
      this.loadData();
    });
    this.msgs.push({ severity: 'warn', summary: '', detail: 'Sters cu succes' });
  }


  onPageChange(page: any): void {
    this.startIndex = (page - 1) * this.pageSize;
    this.endIndex = (page - 1) * this.pageSize + this.pageSize;
    this.paginatedModel = this.purchaseorders.slice(this.startIndex, this.endIndex);
  }


  openModal(content: string) {
    this.modalService.open(content, { centered: true, size: 'lg' });
  }


  closeModal(form, modal) {
    form.reset();
    modal('close');

  }


  // process work

  private loadDataPurchaseorderitems(purchaseorderid) {

    this.service.findAllItemsEntity('purchaseorderitems').subscribe(data => {

      data = data.filter(function (entry) {
        return entry['purchaseorderid'] === purchaseorderid;
      });

      this.purchaseorderitems = data;
    });

  }

  addNewArticleRow() {
    this.purchaseorderitems.push({
      id: this.service.guid(),
      purchaseorderid: this.purchaseorder.id,
      code: '',
      suppliercode: '',
      umid: '',
      quantity: null,
      price: null,
      delivery_term: null,
      description: '',
      artprodid: '',
      reception: 1,
      reception_date: null,
      state: 'add'
    });
  }

  onRowEditInit(item: Purchaseorderitems) {
    this.orderitems_org = JSON.parse(JSON.stringify(item));

  }

  onRowEditSave(item) {
    if (item) {

      for (var key in this.purchaseorderitems) {
        if (this.purchaseorderitems[key]['id'] == item.id)
          this.purchaseorderitems[key] = item;

        if (this.purchaseorderitems[key]['state'] != 'add')
          this.purchaseorderitems[key]['state'] = 'edit';
      }
      delete this.orderitems_org;
      console.log(this.purchaseorderitems[key]);
    }
  }

  onRowEditCancel(item: Purchaseorderitems, index: number) {

    for (var key in this.purchaseorderitems) {
      if (this.purchaseorderitems[key]['id'] == this.orderitems_org['id'])
        this.purchaseorderitems[key] = this.orderitems_org;
    }
    delete this.orderitems_org;
  }

  onRowDelete(article) {
    this.purchaseorderitems_deleted.push(article);

    for (var key in this.purchaseorderitems) {
      if (this.purchaseorderitems[key]['id'] == article['id'])
        this.purchaseorderitems.splice(parseInt(key), 1);
    }
  }


  onUploadOutput(output: UploadOutput): void {
    switch (output.type) {
      case 'allAddedToQueue':
        // uncomment this if you want to auto upload files when added
        // const event: UploadInput = {
        //   type: 'uploadAll',
        //   url: '/upload',
        //   method: 'POST',
        //   data: { foo: 'bar' }
        // };
        // this.uploadInput.emit(event);
        break;
      case 'addedToQueue':
        if (typeof output.file !== 'undefined') {
          this.files.push(output.file);
        }
        break;
      case 'uploading':
        if (typeof output.file !== 'undefined') {
          // update current data in files array for uploading file
          const index = this.files.findIndex((file) => typeof output.file !== 'undefined' && file.id === output.file.id);
          this.files[index] = output.file;
        }
        break;
      case 'removed':
        // remove file from array when removed
        this.files = this.files.filter((file: UploadFile) => file !== output.file);
        break;
      case 'dragOver':
        this.dragOver = true;
        break;
      case 'dragOut':
      case 'drop':
        this.dragOver = false;
        break;
      case 'done':
        // The file is downloaded
        break;
    }
  }

  startUpload(): void {
    const event: UploadInput = {
      type: 'uploadAll',
      url: 'http://ngx-uploader.com/upload',
      method: 'POST',
      data: { foo: 'bar' }
    };

    this.uploadInput.emit(event);
  }

  cancelUpload(id: string): void {
    this.uploadInput.emit({ type: 'cancel', id: id });
  }

  removeFile(id: string): void {
    this.uploadInput.emit({ type: 'remove', id: id });
  }

  removeAllFiles(): void {
    this.uploadInput.emit({ type: 'removeAll' });
  }



  // end class
}


