import { NgModule, Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { DecimalPipe, CommonModule } from '@angular/common';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { Observable, of } from 'rxjs';

import { Table } from './moduledemo.model';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ModuleService } from '../../_services/module.service';
import { ModuleSortableDirective, SortEvent } from '../../_ewo/base/module-sortable.directive';

@Component({
  selector: 'moduledemo',
  templateUrl: './moduledemo.component.html',
  styleUrls: ['./moduledemo.component.scss'],
  providers: [ModuleService, DecimalPipe]
})


export class ModuleDemoDefaultComponent implements OnInit {

  breadCrumbItems: Array<{}>;

  item: any;
  term: any;
  _id: string;

  submitted: boolean;
  loading = false;

  // Table data
  tableData: Table[];

  tables$: Observable<Table[]>;
  total$: Observable<number>;
  dataToPrint = [];

    page = 1;
    pageSize = 10;
    startIndex = 1;
    endIndex = 10;
    totalSize = 0;

    model: Array<Table>;
    paginatedModel: Array<Table>;
    validationform: FormGroup;
  
    currentDate = new Date();

  @ViewChildren(ModuleSortableDirective) headers: QueryList<ModuleSortableDirective>;
  modalPrint = false;
  keys;
  data;

  constructor(public service: ModuleService,
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

     this.model = this.service.tableData;
     this.tableData = this.service.tableData;
     this.tables$ = this.service.tables$;
     this.total$ = this.service.total$;

     this.keys = [];

     if (this.tableData && this.tableData.length > 0)
     for(var k in this.tableData[0]) {

      if (k != 'id')
       this.keys.push(k);
     }

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
      this.model.splice(id, 1);

    });
  }

  onSubmit(values: object) {
    (values['id'])?this.updateItem(values['id'], values):this.createItem();
    this.submitted = true;
  }

  createItem() { 

    this.item = {
      id : this.service.guid(),
      name : this.validationform.get('name').value,
      description : this.validationform.get('description').value,
      //created_at: this.currentDate.getDate() + '/' + this.currentDate.getMonth() + '/' + this.currentDate.getFullYear()
    };

    if (this.validationform.valid) {
  
      this.loading = true;
      this.service._createItem(this.item).subscribe((data: any) => {
        
        this.modalService.dismissAll();
        this.model.push(this.item);
        // this.totalSize = this.model.length + 1;
        // this.paginatedModel = this.model.slice(this.startIndex, this.endIndex);

        this.loading = false;
      });
    }

  }

  updateItem(id, item) {

    if (this.validationform.valid) {

    delete item['id'];
    this.service.updateItem(id, item).subscribe(
      data => {
        this.getItem(id);
        this.loadData();
        item = data;

        this.modalService.dismissAll();
      });
    }

  }

  getItem(id) {
    this.service.getItem(id).subscribe(data => {
      this.item = data;
      this._id = data.id;
      this.validationform.patchValue(this.item);
    });
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
    this.paginatedModel = this.model.slice(this.startIndex, this.endIndex);
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


// @NgModule({
//   imports: [CommonModule],
//   exports: [ReportComponent],
//   declarations: [ReportComponent]
// })
// export class ReportModule { }
