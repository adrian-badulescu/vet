import { NgModule, Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { DecimalPipe, CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { Observable, of } from 'rxjs';

import { Table } from './report.model';
import { NgxSmartModalService } from 'ngx-smart-modal';

import { ModuleService } from '../../../_services/module.service';
import { ModuleSortableDirective, SortEvent } from '../module-sortable.directive';

@Component({
  selector: 'report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss'],
  providers: [ModuleService, DecimalPipe]
})


export class ReportComponent implements OnInit {

  breadCrumbItems: Array<{}>;

  // Table data
  tableData: Table[];
  Lista = null;
  tables$: Observable<Table[]>;
  total$: Observable<number>;
  dataToPrint = [];

  @ViewChildren(ModuleSortableDirective) headers: QueryList<ModuleSortableDirective>;
  modalPrint = false;
  keys;
  data;

  constructor(public service: ModuleService, public ngxSmartModalService: NgxSmartModalService, private route: ActivatedRoute) {
    this.data = this.route.snapshot.data;
    this.service.entity = this.data['entity'];
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
    this.service.findAllItems().subscribe((data)=>{

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
    this.ngxSmartModalService.getModal('inventory').open();
    this.dataToPrint.push(item);
    // console.log(JSON.stringify(this._data))

  }
  closePrintInventory() {
    this.ngxSmartModalService.getModal('inventory').close();
    this.dataToPrint = [];
  }

}

// @NgModule({
//   imports: [CommonModule],
//   exports: [ReportComponent],
//   declarations: [ReportComponent]
// })
// export class ReportModule { }
