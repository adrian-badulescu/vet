import { Component, OnInit, ViewChildren, QueryList  } from '@angular/core';
import { DecimalPipe } from '@angular/common';

import { Observable, of } from 'rxjs';

import { Table } from './receptie.model';

import { InventorySortableDirective, SortEvent } from './../inventory/inventory-sortable.directive';
import { ReceptieService } from './receptie.service';



@Component({
  selector: 'app-receptie',
  templateUrl: './receptie.component.html',
  styleUrls: ['./receptie.component.scss'],
  providers: [ReceptieService, DecimalPipe]
})
export class ReceptieComponent implements OnInit {

    // bread crum data
    breadCrumbItems: Array<{}>;

    // Table data
    tableData: Table[];
  
    tables$: Observable<Table[]>;
    total$: Observable<number>;
  
    @ViewChildren(InventorySortableDirective) headers: QueryList<InventorySortableDirective>;
  
    constructor(public service: ReceptieService) {
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



}
