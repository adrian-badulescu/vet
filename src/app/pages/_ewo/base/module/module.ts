import { NgModule, Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { DecimalPipe, CommonModule } from '@angular/common';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { Observable, of } from 'rxjs';

import { Table } from './module.model';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ModuleService } from '../../../_services/module.service';
import { ModuleSortableDirective, SortEvent } from '../module-sortable.directive';

@Component({
  selector: 'module',
  templateUrl: './module.component.html',
  styleUrls: ['./module.component.scss'],
  providers: [ModuleService, DecimalPipe]
})


export class ModuleComponent implements OnInit {

  breadCrumbItems: Array<{}>;
  Lista = [];
  item: object;
  submitted: boolean;
  term: any;
  _id: string;

  // Table data
  tableData: Table[];

  tables$: Observable<Table[]>;
  total$: Observable<number>;
  dataToPrint = [];

    // page number
    page = 1;
    // default page size
    pageSize = 10;
  
    // start and end index
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
    this.data = this.route.snapshot.data;
    this.service.entity = this.data['entity'];
  }

  ngOnInit() {

    // tslint:disable-next-line: max-line-length
    this.breadCrumbItems = [{ label: 'Dashboard', path: '/' }, { label: 'Rapoarte', path: '/' }, { label: 'Gestiuni', path: '/', active: true }];

    this.validationform = this.formBuilder.group({
      id: [''],
      name: ['', [Validators.required]],
      description: ['']
    });

    this._fetchData();
  }

  /**
   * fetches the table value
   */
  _fetchData() {
    // let tableData: TableData
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
    })
  }

  /**
   * Sort table data
   * @param param0 sort the column
   *
   */
  onSort({ column, direction }: SortEvent) {
    // resetting other headers
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });
    this.service.sortColumn = column;
    this.service.sortDirection = direction;
  }

  print(item) {
    this.ngxSmartModalService.getModal('formentity').open();
    this.dataToPrint.push(item);
    // console.log(JSON.stringify(this._data))

  }
  closePrintInventory() {
    this.ngxSmartModalService.getModal('formentity').close();
    this.dataToPrint = [];
  }

  onSubmit(values: object, form, modal) {

    if (values['id']) {
      this.updateItem(values['id'], values);
    } else {
      this.createItem();
    }
    this.closeModal(form, modal);
  }

  createItem() {

    const id = this.service.guid();
    const name = this.validationform.get('name').value;
    const description = this.validationform.get('description').value;

    this.item = {
      id,
      name,
      description
    };

    if (this.validationform.valid) {

      this.model.push({
        id,
        name,
        description,
        created_at: this.currentDate.getDate() + '/' + this.currentDate.getMonth() + '/' + this.currentDate.getFullYear()
      });

      this.validationform = this.formBuilder.group({
        id: '',
        name: '',
        description: ''
      });

      this.modalService.dismissAll();
    }

    this.submitted = true;
    this.totalSize = this.model.length + 1;
    this.paginatedModel = this.model.slice(this.startIndex, this.endIndex);
    this.service._createItem(this.item).subscribe((data: any) => {
      (data => console.log('Done posting: ' + data));
    });

  }


  getItem(id) {
    this.service.getItem(id).subscribe(data => {
      this.item = data;
      this._id = data.id;
      this.validationform.patchValue(this.item);
    });
  }


  openToEditModal(content, values) {
    this.validationform.patchValue(values);
    this.openModal(content);
  }


  updateItem(id, item) {
    delete item['id'];
    this.service.updateItem(id, item).subscribe(
      data => {
        this.getItem(id);
        this._fetchData();
        item = data;
      });
  }


  deleteItem(id) {
    this.service.deleteItem(id).subscribe(res => {
      this.model.splice(id, 1);
      this._fetchData();
    });
  }


  onPageChange(page: any): void {
    this.startIndex = (page - 1) * this.pageSize;
    this.endIndex = (page - 1) * this.pageSize + this.pageSize;
    this.paginatedModel = this.model.slice(this.startIndex, this.endIndex);
  }

  
  openModal(content: string) {
    this.modalService.open(content, { centered: true, size: 'lg' });
  }

  closeModal(form, modal) {
    form.reset();
    modal('close');

  }

}


// @NgModule({
//   imports: [CommonModule],
//   exports: [ReportComponent],
//   declarations: [ReportComponent]
// })
// export class ReportModule { }
