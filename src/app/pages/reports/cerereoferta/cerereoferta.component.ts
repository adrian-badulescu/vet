import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { Observable, of } from 'rxjs';
import { NgxSmartModalService } from 'ngx-smart-modal';

import { Table } from './cerereoferta.model';

import { InventorySortableDirective, SortEvent } from '../inventory/inventory-sortable.directive';

import { InventoryService } from './cerereoferta.service';


@Component({
  selector: 'app-invoices',
  templateUrl: './cerereoferta.component.html',
  styleUrls: ['./cerereoferta.component.scss'],
  providers: [InventoryService, DecimalPipe]
})
export class CerereOfertaComponent implements OnInit {

  constructor(public service: InventoryService, public ngxSmartModalService: NgxSmartModalService) {
    this.tables$ = service.tables$;
    this.total$ = service.total$;
  }
  checked: boolean = false;
  breadCrumbItems: Array<{}>;
  dataToPrint = [];
  // Table data
  tableData: Table[];
  _Table: Array<Table> = [];
  _data: Table;
 

  tables$: Observable<Table[]>;
  total$: Observable<number>;

  @ViewChildren(InventorySortableDirective) headers: QueryList<InventorySortableDirective>;

  modalPrint = false;



  ngOnInit() {
    // tslint:disable-next-line: max-line-length
    this.breadCrumbItems = [{ label: 'Dashboard', path: '/' }, { label: 'Rapoarte', path: '/' }, { label: 'Facturi', path: '/', active: true }];

    /**
     * fetch data
     */
    this._fetchData();
    this.ngxSmartModalService.setModalData(this._data, "invoice");
  }
  // ngViewAfterInit() {
    
  // }

  /**
   * fetches the table value
   */
  _fetchData() {
    // let tableData: TableData
    this.service.findAllItems().subscribe((data: Table[]) => {
      console.log(data);
      this.tables$ = of(data);
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
    this.ngxSmartModalService.getModal('cerereoferta').open();
    this.dataToPrint.push(item);
    // console.log(JSON.stringify(this._data))

  }

  closePrintCerereOferta(){
    this.ngxSmartModalService.getModal('cerereoferta').close();
    this.dataToPrint = [];
  }


}
