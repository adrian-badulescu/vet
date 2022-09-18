import { Component, OnInit, ViewChildren, QueryList, ViewEncapsulation, Input } from '@angular/core';
import { DecimalPipe } from '@angular/common';

import { Observable, of } from 'rxjs';

import { Table } from './inventory.model';
import { NgxSmartModalService } from 'ngx-smart-modal';

import { tableData } from './data';


import { InventorySortableDirective, SortEvent } from './inventory-sortable.directive';
import { InventoryService } from './inventory.service';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss'],
  providers: [InventoryService, DecimalPipe],
  encapsulation: ViewEncapsulation.None
})

/**
 * Inventory table component - handling the inventory table with sidebar and content
 */
export class InventoryComponent implements OnInit {
  // bread crum data
  breadCrumbItems: Array<{}>;

  // Table data
  tableData: Table[];

  tables$: Observable<Table[]>;
  total$: Observable<number>;
  dataToPrint = [];

  @ViewChildren(InventorySortableDirective) headers: QueryList<InventorySortableDirective>;
  modalPrint = false;

  constructor(public service: InventoryService, public ngxSmartModalService: NgxSmartModalService) {
    this.tables$ = service.tables$;
    this.total$ = service.total$;
  }

  ngOnInit() {
    // tslint:disable-next-line: max-line-length
    this.breadCrumbItems = [{ label: 'Dashboard', path: '/' }, { label: 'Rapoarte', path: '/' }, { label: 'Gestiuni', path: '/', active: true }];

    /**
     * fetch data
     */
    this._fetchData();
  }

  /**
   * fetches the table value
   */
  _fetchData() {
    // let tableData: TableData
    this.service.findAllItems().subscribe((data: Table[])=>{
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
    this.ngxSmartModalService.getModal('inventory').open();
    this.dataToPrint.push(item);
    // console.log(JSON.stringify(this._data))

  }
  closePrintInventory() {
    this.ngxSmartModalService.getModal('inventory').close();
    this.dataToPrint = [];
  }

}
