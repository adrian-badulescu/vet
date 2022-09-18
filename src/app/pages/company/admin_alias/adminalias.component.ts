import { Component, OnInit, ViewChildren, QueryList, ViewChild, Input, Output,  EventEmitter } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


import { Alias } from './adminalias.model';
import { BaseService } from '../../_services/base.service';

import { idLocale } from 'ngx-bootstrap';
import { JsonPipe } from '@angular/common';

import { ToastModule } from 'primeng/toast';
// import {MessageService} from 'primeng/api';
import { Message } from 'primeng//api';
import { MessageService } from 'primeng/api';
import { UploadOutput, UploadInput, UploadFile, humanizeBytes, UploaderOptions } from 'ngx-uploader';
@Component({
  selector: 'adminalias',
  templateUrl: './adminalias.component.html',
  styleUrls: ['./adminalias.component.scss'],
  providers: [MessageService]
})
export class AdminaliasComponent implements OnInit {
  alias: Alias;
  aliases: Array<Alias> = [];



  msgs: Message[] = [];

  breadCrumbItems: Array<{}>;

  item: object;
  submitted: boolean;
  term: any;
  _id: string;
  _aliasid: string;

  // page number
  page = 1;
  // default page size
  pageSize = 10;

  // start and end index
  startIndex = 1;
  endIndex = 10;
  totalSize = 0;

  paginatedModel: Array<Alias>;
  validationform: FormGroup;





  constructor(private modalService: NgbModal, public formBuilder: FormBuilder, private messageService: MessageService,
    private service: BaseService, private router: Router, private route: ActivatedRoute) {
    this.service.entity = 'db_queries_entity';
    // this.options = { concurrency: 1, maxUploads: 3 };
    // this.files = []; // local uploading files array
    // this.uploadInput = new EventEmitter<UploadInput>(); // input events, we use this to emit data to ngx-uploader
    // this.humanizeBytes = humanizeBytes;
  }

  ngOnInit() {
    this.breadCrumbItems = [{ label: 'Dashboard', path: '/' }, { label: 'Company', path: '/' }, { label: 'Module', path: '/', active: true }];

    this.validationform = this.formBuilder.group({
      id: [''],
      alias: [''],
      query: [''],


    });

    this.loadData();
    
  }



  private loadData() {

    this.service.findAllItems().subscribe((data) => {
      this.aliases = data;
      this.startIndex = 0;
      this.endIndex = this.pageSize;
      this.paginatedModel = this.aliases.slice(this.startIndex, this.endIndex);
      this.totalSize = this.aliases.length;
    });

  }

  onSubmit(values: object, form, modal) {

    if (values['id']) {
      this.updateItem(values['id'], values);
    } else {
      this.createItem();
      console.log(values);
    }



    this.closeModal(form, modal);


    console.log(this.item);
  }

  createItem() {

    // const id = this.validationform.get('id').value;
    const alias = this.validationform.get('alias').value;
    const query = this.validationform.get('query').value;


    this.item = {
      // id,
      alias,
      query

    };

    this.alias = this.item as Alias;
    

    if (this.validationform) {

      this.aliases.push(this.alias);
      this.submitted = true;
      this.totalSize = this.aliases.length + 1;
      this.paginatedModel = this.aliases.slice(this.startIndex, this.endIndex);
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

    this.alias = {
      // id: '',
      alias: '',
      query: '',

    };

    
    this.openModal(content);
  }

  openToEditModal(content, item) {

    this.alias = item;
    

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
      this.aliases.splice(id, 1);
      this.loadData();
    });
    this.msgs.push({ severity: 'warn', summary: '', detail: 'Sters cu succes' });
  }


  onPageChange(page: any): void {
    this.startIndex = (page - 1) * this.pageSize;
    this.endIndex = (page - 1) * this.pageSize + this.pageSize;
    this.paginatedModel = this.aliases.slice(this.startIndex, this.endIndex);
  }


  openModal(content: string) {
    this.modalService.open(content, { centered: true, size: 'lg' });
  }


  closeModal(form, modal) {
    form.reset();
    modal('close');

  }


 

  // end class
}


