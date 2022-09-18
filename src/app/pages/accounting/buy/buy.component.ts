
import { Component, OnInit, ViewChildren, QueryList, ViewChild, AfterViewInit } from '@angular/core';
import { DecimalPipe, CommonModule } from '@angular/common';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { Observable, of } from 'rxjs';

import { Table } from './buy.model';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ModuleService } from '../../_services/module.service';
import { ModuleSortableDirective, SortEvent } from '../../_ewo/base/module-sortable.directive';

import { TabsetComponent, TabDirective } from 'ngx-bootstrap/tabs';


@Component({
  selector: 'buy',
  templateUrl: './buy.component.html',
  styleUrls: ['./buy.component.scss'],
  providers: [ModuleService, DecimalPipe],

})


export class BuyComponent implements OnInit, AfterViewInit {

  disableSwitching: boolean;
  breadCrumbItems: Array<{}>;

  item: object;
  submitted: boolean;
  term: any;
  _id: string;

  // Table data


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


  buys: Array<any>;
  tableData: Array<any>;
  paginatedModel: Array<Table[]>;
  validationform: FormGroup;

  currentDate = new Date();
  Currency = ['USD', 'EUR'];
  // 
  o: boolean = false;
  exclus_evidenta: boolean = false;
  baza_exclus_evidenta: boolean = false;
  cern: boolean = false;
  tva_exigibil_incasare: boolean = false;

  @ViewChildren(ModuleSortableDirective) headers: QueryList<ModuleSortableDirective>;
  @ViewChild('tabset', { static: false }) tabset: TabsetComponent;
  modalPrint = false;
  keys;
  data;

  constructor(public service: ModuleService,
    public ngxSmartModalService: NgxSmartModalService, public formBuilder: FormBuilder,
    private route: ActivatedRoute, public modalService: NgbModal) {
    // this.service.urlapi;
    this.service.entity = 'buys';

  }

  ngOnInit() {

    // tslint:disable-next-line: max-line-length
    this.breadCrumbItems = [{ label: 'Dashboard', path: '/' }, { label: 'Contabilitate', path: '/' }, { label: 'Cumparari', path: '/', active: true }];

    this.validationform = this.formBuilder.group({
      // tab1
      id: [''],
      serie_factura: [''],
      cod_furnizor: [''],
      data_factura: [''],
      data_scadenta: [''],
      nr_cartoteca: [''],
      nr_cec: [''],
      tip_factura: [''],
      tip_achizitie: [''],
      tip_doc: [''],
      proc_tva: [''],
      o: [''],
      exclus_evidenta: [''],
      baza_exclus_evidenta: [''],
      cern: [''],
      tva_exigibil_incasare: [''],
      // tab2
      scutit_tva: [''],
      neimpozabil: [''],
      tva_19_20: [''],
      tva_9: [''],
      tva_5: [''],
      tva_neexigibil: [''],
      jurnal_tva_19_20: [''],
      jurnal_tva_9: [''],
      jurnal_tva_5: [''],
      jurnal_tva_neexigibil: [''],
      diferente_tva_19_20: [''],
      diferente_tva_9: [''],
      diferente_tva_5: [''],
      diferente_tva_neexigibil: [''],
      // tab 3
      cod_fiscal: [''],
      cod_fiscal_start: [''],
      cod_fiscal_end: [''],
      tip_operatie: [''],
      fact_avans_409: [''],
      data_fact_avans: [''],
      // tab 4
      total_factura: [''],
      valoare_in_valuta: [''],
      curs_valutar: [''],
      tip_valuta: [''],
      diferente_total_factura: [''],
      taxare_inversa_valoare: [''],
      taxare_inversa_tva: [''],
      taxare_inversa_codprod: [''],
      tva_furnizori: [''],
      total_chelt: [''],
      nir: ['']


    });

    this.loadData();
    console.log(this.buys);
  }

  ngAfterViewInit() {
    setTimeout(() => {
      console.log(this.tabset.tabs);
    }, 1000);
    console.log(this.tabset.tabs);
  }

  // goto(id) {
  //   this.tabset.tabs[id].active = true;
  // }

  /**
   * fetches the table value
   */
  private loadData() {
    this.service.findAllItems().subscribe(data => {
      this.buys = this.service.tableData;
      this.tableData = this.service.tableData;
      this.tables$ = this.service.tables$;
      this.total$ = this.service.total$;
      this.startIndex = 0;
      this.endIndex = this.pageSize;
      this.paginatedModel = this.buys.slice(this.startIndex, this.endIndex);
      this.totalSize = this.buys.length;
      this.keys = [];
      if (this.tableData && this.tableData.length > 0)
      for(var k in this.tableData[0]) {
 
       if (k != 'id')
        this.keys.push(k);
      }
      console.log(this.buys);
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
    const cod_furnizor = this.validationform.get('cod_furnizor').value;
    const data_factura = this.validationform.get('data_factura').value;
    const data_scadenta = this.validationform.get('data_scadenta').value;
    const nr_cartoteca = this.validationform.get('nr_cartoteca').value;
    const nr_cec = this.validationform.get('nr_cec').value;
    const tip_factura = this.validationform.get('tip_factura').value;
    const tip_achizitie = this.validationform.get('tip_achizitie').value;
    const tip_doc = this.validationform.get('tip_doc').value;
    const proc_tva = this.validationform.get('proc_tva').value;
    const o = this.o;
    const exclus_evidenta = this.exclus_evidenta;
    const baza_exclus_evidenta = this.baza_exclus_evidenta;
    const cern = this.cern;
    const tva_exigibil_incasare = this.tva_exigibil_incasare;
    // tab 2
    const scutit_tva = this.validationform.get('scutit_tva').value;
    const neimpozabil = this.validationform.get('neimpozabil').value;
    const tva_19_20 = this.validationform.get('tva_19_20').value;
    const tva_9 = this.validationform.get('tva_9').value;
    const tva_5 = this.validationform.get('tva_5').value;
    const tva_neexigibil = this.validationform.get('tva_neexigibil').value;
    const jurnal_tva_19_20 = this.validationform.get('jurnal_tva_19_20').value;
    const jurnal_tva_9 = this.validationform.get('jurnal_tva_9').value;
    const jurnal_tva_5 = this.validationform.get('jurnal_tva_5').value;
    const jurnal_tva_neexigibil = this.validationform.get('jurnal_tva_neexigibil').value;
    const diferente_tva_19_20 = this.validationform.get('diferente_tva_19_20').value;
    const diferente_tva_9 = this.validationform.get('diferente_tva_9').value;
    const diferente_tva_5 = this.validationform.get('diferente_tva_5').value;
    const diferente_tva_neexigibil = this.validationform.get('diferente_tva_neexigibil').value;
    // tab 3
    const cod_fiscal = this.validationform.get('cod_fiscal').value;
    const cod_fiscal_start = this.validationform.get('cod_fiscal_start').value;
    const cod_fiscal_end = this.validationform.get('cod_fiscal_end').value;
    const tip_operatie = this.validationform.get('tip_operatie').value;
    const fact_avans_409 = this.validationform.get('fact_avans_409').value;
    const data_fact_avans = this.validationform.get('data_fact_avans').value;
    // tab 4
    const total_factura = this.validationform.get('total_factura').value;
    const valoare_in_valuta = this.validationform.get('valoare_in_valuta').value;
    const curs_valutar = this.validationform.get('curs_valutar').value;
    const tip_valuta = this.validationform.get('tip_valuta').value;
    const diferente_total_factura = this.validationform.get('diferente_total_factura').value;
    const taxare_inversa_valoare = this.validationform.get('taxare_inversa_valoare').value;
    const taxare_inversa_tva = this.validationform.get('taxare_inversa_tva').value;
    const taxare_inversa_codprod = this.validationform.get('taxare_inversa_codprod').value;
    const tva_furnizori = this.validationform.get('tva_furnizori').value;
    const total_chelt = this.validationform.get('total_chelt').value;
    const nir = this.validationform.get('nir').value;

    this.item = {
      // tab 1
      id,
      serie_factura,
      cod_furnizor,
      data_factura,
      data_scadenta,
      nr_cartoteca,
      nr_cec,
      tip_factura,
      tip_achizitie,
      tip_doc,
      proc_tva,
      o,
      exclus_evidenta,
      baza_exclus_evidenta,
      cern,
      tva_exigibil_incasare,
      // tab 2
      scutit_tva,
      neimpozabil,
      tva_19_20,
      tva_9,
      tva_5,
      tva_neexigibil,
      jurnal_tva_19_20,
      jurnal_tva_9,
      jurnal_tva_5,
      jurnal_tva_neexigibil,
      diferente_tva_19_20,
      diferente_tva_9,
      diferente_tva_5,
      diferente_tva_neexigibil,
      // tab 3
      cod_fiscal,
      cod_fiscal_start,
      cod_fiscal_end,
      tip_operatie,
      fact_avans_409,
      data_fact_avans,
      // tab 4
      total_factura,
      valoare_in_valuta,
      curs_valutar,
      tip_valuta,
      diferente_total_factura,
      taxare_inversa_valoare,
      taxare_inversa_tva,
      taxare_inversa_codprod,
      tva_furnizori,
      total_chelt,
      nir
    };


    if (this.validationform) {
      this.buys.push({
        // tab 1
        id,
        serie_factura,
        cod_furnizor,
        data_factura,
        data_scadenta,
        nr_cartoteca,
        nr_cec,
        tip_factura,
        tip_achizitie,
        tip_doc,
        proc_tva,
        o,
        exclus_evidenta,
        baza_exclus_evidenta,
        cern,
        tva_exigibil_incasare,
        // tab 2
        scutit_tva,
        neimpozabil,
        tva_19_20,
        tva_9,
        tva_5,
        tva_neexigibil,
        jurnal_tva_19_20,
        jurnal_tva_9,
        jurnal_tva_5,
        jurnal_tva_neexigibil,
        diferente_tva_19_20,
        diferente_tva_9,
        diferente_tva_5,
        diferente_tva_neexigibil,
        // tab 3
        cod_fiscal,
        cod_fiscal_start,
        cod_fiscal_end,
        tip_operatie,
        fact_avans_409,
        data_fact_avans,
        // tab 4
        total_factura,
        valoare_in_valuta,
        curs_valutar,
        tip_valuta,
        diferente_total_factura,
        taxare_inversa_valoare,
        taxare_inversa_tva,
        taxare_inversa_codprod,
        tva_furnizori,
        total_chelt,
        nir
      });


      this.submitted = true;
      this.totalSize = this.buys.length + 1;
      this.paginatedModel = this.buys.slice(this.startIndex, this.endIndex);
      this.service._createItem(this.item).subscribe((data: any) => {
        (data => console.log('Done posting: ' + data));
      });


      this.modalService.dismissAll();
    }
    console.log(this.item);
    this.loadData();

  }
  handleSelected($event) {
    switch($event.target.value && $event.target.checked) {
  case $event.target.value === 'o' && $event.target.checked === true:
    this.o = true;
    break;
  case $event.target.value === 'exclus_evidenta' && $event.target.checked === true:
    this.exclus_evidenta = true;
    break;
  case $event.target.value === 'baza_exclus_evidenta' && $event.target.checked === true:
    this.baza_exclus_evidenta = true;
    break;
  case $event.target.value === 'cern' && $event.target.checked === true:
    this.cern = true;
    break;
  case $event.target.value === 'tva_exigibil_incasare' && $event.target.checked === true:
    this.tva_exigibil_incasare = true;
    break;

}



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
      this.buys.splice(id, 1);
      this.loadData();
    });
  }


  onPageChange(page: any): void {
    this.startIndex = (page - 1) * this.pageSize;
    this.endIndex = (page - 1) * this.pageSize + this.pageSize;
    this.paginatedModel = this.buys.slice(this.startIndex, this.endIndex);
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