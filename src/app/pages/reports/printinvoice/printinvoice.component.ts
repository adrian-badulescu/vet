import { Component, OnInit, Input } from '@angular/core';
import { Table } from '../invoices/invoices.model';

@Component({
  selector: 'print-invoice',
  templateUrl: './printinvoice.component.html',
  styleUrls: ['./printinvoice.component.scss']
})

/**
 * Invoice component - handling the invoice with sidebar and content
 */
export class PrintinvoiceComponent implements OnInit {
  objectkeys = Object.keys;
  // bread crumb data
  breadCrumbItems: Array<{}>;

  @Input()
  dataToPrint: Array<Table> = [];
  
  @Input()
  tableHeaders: Array<string> = [];
  constructor() { }

  ngOnInit() {
    this.breadCrumbItems = [{ label: 'Minton', path: '/' }, { label: 'Extras', path: '/' }, { label: 'Invoice', path: '/', active: true }];
    
  }

}
