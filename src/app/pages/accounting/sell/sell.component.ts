import { NgModule, Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { DecimalPipe, CommonModule } from '@angular/common';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { Observable, of } from 'rxjs';

import { Table } from './sell.model';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ModuleService } from '../../_services/module.service';
import { ModuleSortableDirective, SortEvent } from '../../_ewo/base/module-sortable.directive';

@Component({
  selector: 'sell',
  templateUrl: './sell.component.html',
  styleUrls: ['./sell.component.scss'],
  providers: [ModuleService, DecimalPipe]
})


export class SellComponent implements OnInit {

  breadCrumbItems: Array<{}>;

  item: object;
  submitted: boolean;
  term: any;
  _id: string;

  // Table data
  tableData: any[];

  tables$: Observable<any[]>;
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

  

  sales: Array<any>;
  paginatedModel: Array<any>;
  validationform: FormGroup;

  currentDate = new Date();

  @ViewChildren(ModuleSortableDirective) headers: QueryList<ModuleSortableDirective>;
  modalPrint = false;
  data;
  keys;

  constructor(public service: ModuleService,
    public ngxSmartModalService: NgxSmartModalService, public formBuilder: FormBuilder,
    private route: ActivatedRoute, public modalService: NgbModal) {

    this.service.entity = "sales";
  }

  ngOnInit() {

    // tslint:disable-next-line: max-line-length
    this.breadCrumbItems = [{ label: 'Dashboard', path: '/' }, { label: 'Contabilitate', path: '/' }, { label: 'Vanzari', path: '/', active: true }];

    this.validationform = this.formBuilder.group({
      id: [''],
      serie_factura: [''],
      data_factura: [''],
      data_scadenta: [''],
      cont_creditor: [''],
      cont_creditor_2nd: [''],
      cod_furnizor: [''],
      cont_debitor: [''],
      cont_debitor_2nd: [''],
      denumire: [''],
      valoare: [''],
      centru_cost: [''],
      cont_chelt: [''],
      cont_chelt_2nd: [''],
      comanda: [''],
      nir: [''],
      data_nir: [''],
      val_valuta: [''],
      nr_luni_esalonare: [''],
      data_start: [''],
      cont_gr_9: [''],
      cont_gr_9_2nd: [''],
      curs_pvr: [''],
      nr_inv: [''],
      unknown: [''],
      // created_at: [''],
    });

    this.loadData();
  }

  /**
   * fetches the table value
   */
  private loadData() {
    // let tableData: TableData
    this.service.findAllItems().subscribe((data) => {

      this.sales = this.service.tableData;
      this.tableData = this.service.tableData;
      this.tables$ = this.service.tables$;
      this.total$ = this.service.total$;
      this.startIndex = 0;
      this.endIndex = this.pageSize;
      this.paginatedModel = this.sales.slice(this.startIndex, this.endIndex);
      this.totalSize = this.sales.length;
      this.keys = [];
      if (this.tableData && this.tableData.length > 0)
      for(var k in this.tableData[0]) {
 
       if (k != 'id')
        this.keys.push(k);
      }
      console.log(this.sales);
    });
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

  get form() {
    return this.validationform.controls;
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
    const serie_factura = this.validationform.get('serie_factura').value;
    const data_factura = this.validationform.get('data_factura').value;
    const data_scadenta = this.validationform.get('data_scadenta').value;
    const cont_creditor = this.validationform.get('cont_creditor').value;
    const cont_creditor_2nd = this.validationform.get('cont_creditor_2nd').value;
    const cod_furnizor = this.validationform.get('cod_furnizor').value;
    const cont_debitor = this.validationform.get('cont_debitor').value;
    const cont_debitor_2nd = this.validationform.get('cont_debitor_2nd').value;
    const denumire = this.validationform.get('denumire').value;
    const valoare = this.validationform.get('valoare').value;
    const centru_cost = this.validationform.get('centru_cost').value;
    const cont_chelt = this.validationform.get('cont_chelt').value;
    const cont_chelt_2nd = this.validationform.get('cont_chelt_2nd').value;
    const comanda = this.validationform.get('comanda').value;
    const nir = this.validationform.get('nir').value;
    const data_nir = this.validationform.get('data_nir').value;
    const val_valuta = this.validationform.get('val_valuta').value;
    const nr_luni_esalonare = this.validationform.get('nr_luni_esalonare').value;
    const data_start = this.validationform.get('data_start').value;
    const cont_gr_9 = this.validationform.get('cont_gr_9').value;
    const cont_gr_9_2nd = this.validationform.get('cont_gr_9_2nd').value;
    const curs_pvr = this.validationform.get('curs_pvr').value;
    const nr_inv = this.validationform.get('nr_inv').value;
    const unknown = this.validationform.get('unknown').value;
    const created_at = new Date();


    this.item = {
      id,
      serie_factura,
      data_factura,
      data_scadenta,
      cont_creditor,
      cont_creditor_2nd,
      cod_furnizor,
      cont_debitor,
      cont_debitor_2nd,
      denumire,
      valoare,
      centru_cost,
      cont_chelt,
      cont_chelt_2nd,
      comanda,
      nir,
      data_nir,
      val_valuta,
      nr_luni_esalonare,
      data_start,
      cont_gr_9,
      cont_gr_9_2nd,
      curs_pvr,
      nr_inv,
      unknown,
      created_at
    };

    if (this.validationform) {

      this.sales.push({
        id,
        serie_factura,
        data_factura,
        data_scadenta,
        cont_creditor,
        cont_creditor_2nd,
        cod_furnizor,
        cont_debitor,
        cont_debitor_2nd,
        denumire,
        valoare,
        centru_cost,
        cont_chelt,
        cont_chelt_2nd,
        comanda,
        nir,
        data_nir,
        val_valuta,
        nr_luni_esalonare,
        data_start,
        cont_gr_9,
        cont_gr_9_2nd,
        curs_pvr,
        nr_inv,
        unknown,
        created_at
      });

      this.submitted = true;
      this.totalSize = this.sales.length + 1;
      this.paginatedModel = this.sales.slice(this.startIndex, this.endIndex);
      this.service._createItem(this.item).subscribe((data: any) => {
        (data => console.log('Done posting: ' + data));
      });
      this.modalService.dismissAll();
    }


    console.log(this.item);
    this.loadData();
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
        this.loadData();
        item = data;
      });
  }


  deleteItem(id) {
    this.service.deleteItem(id).subscribe(res => {
      this.sales.splice(id, 1);
      this.loadData();
    });
  }


  onPageChange(page: any): void {
    this.startIndex = (page - 1) * this.pageSize;
    this.endIndex = (page - 1) * this.pageSize + this.pageSize;
    this.paginatedModel = this.sales.slice(this.startIndex, this.endIndex);
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
