import { NgModule, Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { DecimalPipe, CommonModule } from '@angular/common';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { Observable, of } from 'rxjs';

import { Model } from './moduledemo.model';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ModuleDemoService } from './moduledemo.service';
import { ModuleSortableDirective, SortEvent } from '../../_ewo/base/module-sortable.directive';

@Component({
  selector: 'moduledemo',
  templateUrl: './moduledemo.component.html',
  styleUrls: ['./moduledemo.component.scss'],
  providers: [ModuleDemoService, DecimalPipe]
})


export class ModuleGridDefaultComponent implements OnInit {

  breadCrumbItems: Array<{}>;

  item: any;
  term: any;
  Lista = 10;
  submitted: boolean;
  loading = false;

  tableData: Model[];
  tables$: Observable<Model[]>;
  total$: Observable<number>;
  dataToPrint = [];

    page = 1;
    pageSize = 10;
    startIndex = 1;
    endIndex = 10;
    totalSize = 0;

    paginatedModel: Array<Model>;
    validationform: FormGroup;
  
    currentDate = new Date();

  @ViewChildren(ModuleSortableDirective) headers: QueryList<ModuleSortableDirective>;
  modalPrint = false;
  data;

  constructor(public service: ModuleDemoService,
    public ngxSmartModalService: NgxSmartModalService, public formBuilder: FormBuilder,
    private route: ActivatedRoute, public modalService: NgbModal) {

    this.service.entity = "moduledemo";
  }

  ngOnInit() {

    this.breadCrumbItems = [{ label: 'Dashboard', path: '/' }, { label: 'Dev', path: '/' }, { label: 'Module demo', path: '/', active: true }];

    this.validationform = this.formBuilder.group({
      id: [''],
      name: ['', [Validators.required]],
      description: ['']
    });

    this.loadData();
  }


  loadData() {

    this.loading = true;
    this.service.findAllItems().subscribe((data)=>{

     this.tableData = this.service.tableData;
     this.tables$ = this.service.tables$;
     this.total$ = this.service.total$;

     this.loading = false;
    })
  }

  add(content){
    this.submitted = false;
    this.validationform.reset();
    this.modalService.open(content, { centered: true, size: 'sm' });
  }

  edit(content, values) {
    this.submitted = false;
    this.validationform.patchValue(values);
    this.modalService.open(content, { centered: true, size: 'sm' });
  }

  delete(id) {
    this.loading = true;
    this.service.deleteItem(id).subscribe(res => {

      this.loading = false;
      this.tableData.splice(id, 1);

    });
  }

  onSubmit(values: object) {
    (values['id'])?this.updateItem(values):this.createItem(values);
    this.submitted = true;
  }

  createItem(data) { 

    this.item = data;
    this.item['id'] = this.service.guid();
    //created_at: this.currentDate.getDate() + '/' + this.currentDate.getMonth() + '/' + this.currentDate.getFullYear()

    if (this.validationform.valid) {
  
      this.loading = true;
      this.service._createItem(this.item).subscribe((data: any) => {
        
        this.modalService.dismissAll();
        this.tableData.push(this.item);
        this.totalSize = this.tableData.length + 1;
        this.paginatedModel = this.tableData.slice(this.startIndex, this.endIndex);

        this.loading = false;
      });
    }

  }

  updateItem(data) {

    if (this.validationform.valid) {

    this.item = data;
    this.service.updateItem(this.item['id'], this.item).subscribe(
      data => {

        for(var i in this.tableData) {
          if (this.tableData[i]['id'] == this.item['id'])
          this.tableData[i] = this.item;
        }

        this.modalService.dismissAll();
      });
    }

  }

  onSort({ column, direction }: SortEvent) {
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });
    this.service.sortColumn = column;
    this.service.sortDirection = direction;
  }

  onPageChange(page: any): void {
    this.startIndex = (page - 1) * this.pageSize;
    this.endIndex = (page - 1) * this.pageSize + this.pageSize;
    this.paginatedModel = this.tableData.slice(this.startIndex, this.endIndex);
  }

  closeModal(form, modal) {
    form.reset();
    modal('close');
  }

  refresh(){
    this.loadData();
  }

  print(item) {
    this.ngxSmartModalService.getModal('formentity').open();
    this.dataToPrint.push(item);

  }
  closePrintInventory() {
    this.ngxSmartModalService.getModal('formentity').close();
    this.dataToPrint = [];
  }

  get form() {
    return this.validationform.controls;
  }

}
