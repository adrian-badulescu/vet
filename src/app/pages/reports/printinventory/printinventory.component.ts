import { Component, OnInit, Input } from '@angular/core';
import { Table } from './../inventory/inventory.model';
@Component({
  selector: 'app-printinventory',
  templateUrl: './printinventory.component.html',
  styleUrls: ['./printinventory.component.scss'],
  
})
export class PrintinventoryComponent implements OnInit {

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
