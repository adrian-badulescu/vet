import { Component, OnInit, ViewChildren, QueryList, Input } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { Observable, of } from 'rxjs';

import { Table } from './printcerereoferta.model';

import { PrintcerereofertaSortableDirective, SortEvent } from './printcerereoferta-sortable.directive';
import { PrintcerereofertaService } from './printcerereoferta.service';

@Component({
  selector: 'app-printcerereoferta',
  templateUrl: './printcerereoferta.component.html',
  styleUrls: ['./printcerereoferta.component.scss'],
  providers: [PrintcerereofertaService, DecimalPipe]
})

/**
 * Cerereoferta table component - handling the cerereoferta table with sidebar and content
 */
export class PrintcerereofertaComponent implements OnInit {
  // bread crum data
  breadCrumbItems: Array<{}>;

  @Input()
  dataToPrint: Array<Table> = [];

  // Table data
  tableData: Table[];

  tables$: Observable<Table[]>;
  total$: Observable<number>;

  @ViewChildren(PrintcerereofertaSortableDirective) headers: QueryList<PrintcerereofertaSortableDirective>;

  constructor(public service: PrintcerereofertaService) {
    this.tables$ = service.tables$;
    this.total$ = service.total$;
  }

  ngOnInit() {
    // tslint:disable-next-line: max-line-length
    this.breadCrumbItems = [{ label: 'Dashboard', path: '/' }, { label: 'Rapoarte', path: '/' }, { label: 'Cerere oferta', path: '/', active: true }];

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



}
