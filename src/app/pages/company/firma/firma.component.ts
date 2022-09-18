import { Component, OnInit, ViewChildren, QueryList, ViewChild, Input, Output,  EventEmitter } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


import { Company, CompanyxWork } from './firma.model';
import { BaseService } from '../../_services/base.service';

import { idLocale } from 'ngx-bootstrap';
import { JsonPipe } from '@angular/common';

import { ToastModule } from 'primeng/toast';
// import {MessageService} from 'primeng/api';
import { Message } from 'primeng//api';
import { MessageService } from 'primeng/api';
import { UploadOutput, UploadInput, UploadFile, humanizeBytes, UploaderOptions } from 'ngx-uploader';
@Component({
  selector: 'app-firma',
  templateUrl: './firma.component.html',
  styleUrls: ['./firma.component.scss'],
  providers: [MessageService]
})
export class FirmaComponent implements OnInit {
  company: Company;
  companies: Array<Company> = [];

  work: CompanyxWork;
  work_org: CompanyxWork;

  companyxwork: Array<CompanyxWork> = [];
  companyxwork_deleted: Array<CompanyxWork> = [];

  msgs: Message[] = [];

  breadCrumbItems: Array<{}>;

  item: object;
  submitted: boolean;
  term: any;
  _id: string;
  _companyid: string;

  // page number
  page = 1;
  // default page size
  pageSize = 10;

  // start and end index
  startIndex = 1;
  endIndex = 10;
  totalSize = 0;

  paginatedModel: Array<Company>;
  validationform: FormGroup;

  currentDate = new Date();

  Ceoid: Array<string> = ['Lolo', 'Biggie', 'Dummytrow'];

  options: UploaderOptions;
  formData: FormData;
  files: UploadFile[];
  uploadInput: EventEmitter<UploadInput>;
  humanizeBytes: Function;
  dragOver: boolean;



  constructor(private modalService: NgbModal, public formBuilder: FormBuilder, private messageService: MessageService,
    private service: BaseService, private router: Router, private route: ActivatedRoute) {
    this.service.entity = 'company';
    this.options = { concurrency: 1, maxUploads: 3 };
    this.files = []; // local uploading files array
    this.uploadInput = new EventEmitter<UploadInput>(); // input events, we use this to emit data to ngx-uploader
    this.humanizeBytes = humanizeBytes;
  }

  ngOnInit() {
    this.breadCrumbItems = [{ label: 'Dashboard', path: '/' }, { label: 'Company', path: '/' }, { label: 'Module', path: '/', active: true }];

    this.validationform = this.formBuilder.group({
      id: [''],
      name: [''],
      cui: ['', [Validators.required, Validators.pattern('[+-]?([0-9]*[.])?[0-9]+')]],
      // logo: [''],
      header: [''],
      ceoid: [''],
      nrregcom: [''],
      slogan: [''],
      fax: [''],
      adresa: [''],
      codpostal: [''],
      // pathlogo: ['']

    });

    this.loadData();
    console.log(this.companyxwork);
  }



  private loadData() {

    this.service.findAllItems().subscribe((data) => {
      this.companies = data;
      this.startIndex = 0;
      this.endIndex = this.pageSize;
      this.paginatedModel = this.companies.slice(this.startIndex, this.endIndex);
      this.totalSize = this.companies.length;
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
    for (var key in this.companyxwork) {
      if (this.companyxwork[key]['state'] == 'add') {
        delete this.companyxwork[key]['state'];
        this.service._createItemEntity('companyxwork', this.companyxwork[key]).subscribe(data => {
        });
      }
      if (this.companyxwork[key]['state'] == 'edit') {
        console.log(this.companyxwork);
        // tslint:disable-next-line: align
        delete this.companyxwork[key]['state'];
        this.service.updateItemEntity('companyxwork', this.companyxwork[key]['id'], this.companyxwork[key]).subscribe(data => {
        });
      }
    }
    for (var key in this.companyxwork_deleted) {
      this.service.deleteItemEntity('companyxwork', this.companyxwork[key]['id']).subscribe(data => {
      });
    }


    this.closeModal(form, modal);


    console.log(this.item);
  }

  createItem() {

    const id = this.service.guid();
    const name = this.validationform.get('name').value;
    const cui = this.validationform.get('cui').value;
    // const logo = this.validationform.get('logo').value;
    const header = this.validationform.get('header').value;
    const ceoid = this.validationform.get('ceoid').value;
    const nrregcom = this.validationform.get('nrregcom').value;
    const slogan = this.validationform.get('slogan').value;
    const fax = this.validationform.get('fax').value;
    const adresa = this.validationform.get('adresa').value;
    const codpostal = this.validationform.get('codpostal').value;
    // const pathlogo = this.validationform.get('pathlogo').value;

    this.item = {
      id,
      name,
      cui,
      // logo,
      header,
      ceoid,
      nrregcom,
      slogan,
      fax,
      adresa,
      codpostal,
      // pathlogo,
    };

    this.company = this.item as Company;
    this.loadDataCompaniesxWork(this.company.id);

    if (this.validationform) {

      this.companies.push(this.company);
      this.submitted = true;
      this.totalSize = this.companies.length + 1;
      this.paginatedModel = this.companies.slice(this.startIndex, this.endIndex);
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

    this.company = {
      id: this.service.guid(),
      name: '',
      cui: null,
      // logo: '',
      header: '',
      ceoid: '',
      nrregcom: '',
      slogan: '',
      fax: '',
      adresa: '',
      codpostal: '',
      // pathlogo: '',
    };

    this.loadDataCompaniesxWork(this.company.id);
    this.openModal(content);
  }

  openToEditModal(content, item) {

    this.company = item;
    this.loadDataCompaniesxWork(this.company.id);

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
      this.companies.splice(id, 1);
      this.loadData();
    });
    this.msgs.push({ severity: 'warn', summary: '', detail: 'Sters cu succes' });
  }


  onPageChange(page: any): void {
    this.startIndex = (page - 1) * this.pageSize;
    this.endIndex = (page - 1) * this.pageSize + this.pageSize;
    this.paginatedModel = this.companies.slice(this.startIndex, this.endIndex);
  }


  openModal(content: string) {
    this.modalService.open(content, { centered: true, size: 'lg' });
  }


  closeModal(form, modal) {
    form.reset();
    modal('close');

  }


  // process work

  private loadDataCompaniesxWork(companyid) {

    this.service.findAllItemsEntity('companyxwork').subscribe(data => {

      data = data.filter(function (entry) {
        return entry['companyid'] === companyid;
      });

      this.companyxwork = data;
    });

  }

  addNewArticleRow() {
    this.companyxwork.push({
      id: this.service.guid(),
      companyid: this.company.id,
      name: '',
      main: null,
      phone: '',
      email: '',
      notes: '',
      state: 'add'
    });
  }

  onRowEditInit(item: CompanyxWork) {
    this.work_org = JSON.parse(JSON.stringify(item));
  }

  onRowEditSave(item) {
    if (item) {

      for (var key in this.companyxwork) {
        if (this.companyxwork[key]['id'] == item.id)
          this.companyxwork[key] = item;

        if (this.companyxwork[key]['state'] != 'add')
          this.companyxwork[key]['state'] = 'edit';
      }
      delete this.work_org;
      console.log(this.companyxwork[key]);
    }
  }

  onRowEditCancel(item: CompanyxWork, index: number) {

    for (var key in this.companyxwork) {
      if (this.companyxwork[key]['id'] == this.work_org['id'])
        this.companyxwork[key] = this.work_org;
    }
    delete this.work_org;
  }

  onRowDelete(article) {
    this.companyxwork_deleted.push(article);

    for (var key in this.companyxwork) {
      if (this.companyxwork[key]['id'] == article['id'])
        this.companyxwork.splice(parseInt(key), 1);
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


