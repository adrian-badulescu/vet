import { Component, OnInit, Input } from '@angular/core';
@Component({
  selector: 'printtable',
  templateUrl: './printtable.component.html',
  styleUrls: ['./printtable.component.scss']
})

/**
 * Invoice component - handling the invoice with sidebar and content
 */
export class PrintTableComponent implements OnInit {
  objectkeys = Object.keys;
  // bread crumb data
  breadCrumbItems: Array<{}>;

  @Input()
  dataToPrint: Array<any> = [];
  
  @Input()
  tableHeaders: Array<string> = []; 
  constructor() { }

  // ngOnInit() {
  //   this.breadCrumbItems = [{ label: 'Dashboard', path: '/' }, { label: 'Dev', path: '/' }, { label: 'Invoice', path: '/', active: true }];
    
  // }

  
  sales: any[];
  _sales: any[];

  ngOnInit() {
      this.sales = [
          { brand: 'Apple', lastYearSale: '51%', thisYearSale: '40%', lastYearProfit: '$54,406.00', thisYearProfit: '$43,342' },
      ];
      this._sales = [
        { brand: 'Apple', lastYearSale: '51%', thisYearSale: '40%', lastYearProfit: '$54,406.00', thisYearProfit: '$43,342' },
    ];
  }

//   exportPdf() {
//     import("jspdf").then(jsPDF => {
//         import("jspdf-autotable").then(x => {
//             const doc = new jsPDF.default(0,0);
//             doc.autoTable(this.columns, this.cars);
//             doc.save('primengTable.pdf');
//         })
//     })
// }


}
