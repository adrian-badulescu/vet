
import { Component, OnInit, ViewChildren, QueryList, ViewChild, Input, Output } from '@angular/core';

import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


import { Invoices, InvoicesxArticles } from './invoices.model';
import { BaseService } from '../../_services/base.service';

import { idLocale } from 'ngx-bootstrap';
import { JsonPipe } from '@angular/common';

import { ToastModule } from 'primeng/toast';
// import {MessageService} from 'primeng/api';
import { Message } from 'primeng//api';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.scss',],
  providers: [MessageService]
})


export class InvoicesComponent implements OnInit {
  invoice: Invoices;
  invoices: Array<Invoices> = [];

  article: InvoicesxArticles;
  article_org: InvoicesxArticles;

  invoicexarticles: Array<InvoicesxArticles> = [];
  invoicexarticles_deleted: Array<InvoicesxArticles> = [];

  msgs: Message[] = [];

  breadCrumbItems: Array<{}>;

  item: object;
  submitted: boolean;
  term: any;
  _id: string;
  _idarticle: string;

  // page number
  page = 1;
  // default page size
  pageSize = 10;

  // start and end index
  startIndex = 1;
  endIndex = 10;
  totalSize = 0;

  paginatedModel: Array<Invoices>;
  validationform: FormGroup;

  currentDate = new Date();

  constructor(private modalService: NgbModal, public formBuilder: FormBuilder, private messageService: MessageService,
    private service: BaseService, private router: Router, private route: ActivatedRoute) {

    //for server entity param
    this.service.entity = 'invoices';
  }

  ngOnInit() {
    this.breadCrumbItems = [{ label: 'Dashboard', path: '/' }, { label: 'Dev', path: '/' }, { label: 'Module', path: '/', active: true }];

    this.validationform = this.formBuilder.group({
      id: [''],
      number: ['', [Validators.required]],
      date: ['']
    });
    
    this.loadData();
    console.log(this.invoicexarticles);

  }

  private loadData() {

    this.service.findAllItems().subscribe((data) => {
      this.invoices = data;
      this.startIndex = 0;
      this.endIndex = this.pageSize;
      this.paginatedModel = this.invoices.slice(this.startIndex, this.endIndex);
      this.totalSize = this.invoices.length;
    });

  }

  onSubmit(values: object, form, modal) {

    if (values['id']) {
      this.updateItem(values['id'], values);
    } else {
      this.createItem();
    }

    //save articles
    for (var key in this.invoicexarticles){
      if (this.invoicexarticles[key]['state'] == 'add'){
        delete this.invoicexarticles[key]['state'];
        this.service._createItemEntity('invoicexarticles', this.invoicexarticles[key]).subscribe(data => {
        });
      }
      if (this.invoicexarticles[key]['state'] == 'edit'){console.log(this.invoicexarticles);
        delete this.invoicexarticles[key]['state'];
        this.service.updateItemEntity('invoicexarticles', this.invoicexarticles[key]['id'], this.invoicexarticles[key]).subscribe(data => {
        }); 
      }
    }
    for (var key in this.invoicexarticles_deleted){
      this.service.deleteItemEntity('invoicexarticles', this.invoicexarticles[key]['id']).subscribe(data => {
      });
    }


    this.closeModal(form, modal);

  }


  createItem() {

    const id = this.service.guid();
    const number = this.validationform.get('number').value;
    const date = this.validationform.get('date').value;

    this.item = {
      id,
      number,
      date,
      created_at: this.currentDate.getDate() + '/' + this.currentDate.getMonth() + '/' + this.currentDate.getFullYear()
    };

    this.invoice = <Invoices>this.item;
    this.loadDataInvoicesxArticles(this.invoice.id);

    if (this.validationform.valid) {

      this.invoices.push(this.invoice);
      this.validationform = this.formBuilder.group({
        id: '',
        number: '',
        date: '',       
      });

      this.modalService.dismissAll();
    }

    this.submitted = true;
    this.totalSize = this.invoices.length + 1;
    this.paginatedModel = this.invoices.slice(this.startIndex, this.endIndex);
    this.service._createItem(this.item).subscribe((data: any) => {
      (data => console.log('Done posting: ' + data));
    });

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

    this.invoice = {
      id : this.service.guid(),
      number: '',
      date : new Date(),
      created_at: this.currentDate.getDate() + '/' + this.currentDate.getMonth() + '/' + this.currentDate.getFullYear()
    };

    this.loadDataInvoicesxArticles(this.invoice.id);
    this.openModal(content);
  }

  openToEditModal(content, item) {

    this.invoice = item;
    this.loadDataInvoicesxArticles(this.invoice.id);

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
      this.invoices.splice(id, 1);
      this.loadData();
    });
    this.msgs.push({ severity: 'warn', summary: '', detail: 'Sters cu succes' });
  }


  onPageChange(page: any): void {
    this.startIndex = (page - 1) * this.pageSize;
    this.endIndex = (page - 1) * this.pageSize + this.pageSize;
    this.paginatedModel = this.invoices.slice(this.startIndex, this.endIndex);
  }


  openModal(content: string) {
    this.modalService.open(content, { centered: true, size: 'lg' });
  }


  closeModal(form, modal) {
    form.reset();
    modal('close');

  }


  // process article

  private loadDataInvoicesxArticles(invoiceid) {

    this.service.findAllItemsEntity('invoicexarticles').subscribe(data => {

      data = data.filter(function (entry) {
        return entry['invoiceid'] === invoiceid;
      });

      this.invoicexarticles= data;
    });

  }

  addNewArticleRow() {
    this.invoicexarticles.push({
      id: this.service.guid(),
      invoiceid: this.invoice.id,
      article: '',
      price: '',
      qty: '',
      state: 'add'
    });
  }

  onRowEditInit(item: InvoicesxArticles) {
    this.article_org = JSON.parse(JSON.stringify(item));
  }

  onRowEditSave(item) {
    if (item) {

      for (var key in this.invoicexarticles){
        if (this.invoicexarticles[key]['id'] == item.id)
        this.invoicexarticles[key] = item;

        if (this.invoicexarticles[key]['state'] != 'add')
          this.invoicexarticles[key]['state'] = 'edit';
      }
      delete this.article_org;
      console.log(this.invoicexarticles[key]);
    } 
  }

  onRowEditCancel(item: InvoicesxArticles, index: number) {

    for (var key in this.invoicexarticles){
      if (this.invoicexarticles[key]['id'] == this.article_org['id'])
      this.invoicexarticles[key] = this.article_org; 
    }
    delete this.article_org;
  }

  onRowDelete(article) {
    this.invoicexarticles_deleted.push(article);

    for (var key in this.invoicexarticles){
      if (this.invoicexarticles[key]['id'] == article['id'])
      this.invoicexarticles.splice(parseInt(key), 1); 
    }
  }

}
