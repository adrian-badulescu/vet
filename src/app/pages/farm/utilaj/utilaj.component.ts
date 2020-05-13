import { Component, OnInit, ViewChild } from '@angular/core';
import { Base } from '../../_ewo/base';
import { EwoColumn, EwoProperty } from '../../_ewo/model/model';
import { SelectItem, LazyLoadEvent, FilterMetadata } from 'primeng/components/common/api';

import { BaseService as EwoService } from '../../_ewo/service/service';

import { UtilajCls } from './utilaj.model';

import { BaseService } from '../../_services/base.service';
import { TabsetComponent } from 'ngx-bootstrap/tabs'
import { Validators, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-utilaj',
  templateUrl: './utilaj.component.html',
  styleUrls: ['./utilaj.component.scss'],
  providers: [EwoService, BaseService]
})
export class UtilajComponent extends Base implements OnInit {
  @ViewChild('tabset', { static: false }) tabset: TabsetComponent;
  breadCrumbItems: Array<{}>;
  selection: string;


  list: UtilajCls[];
  columns: any[];
  item: UtilajCls = new UtilajCls();
  selectedItems: UtilajCls[];
  value: Date;
  listpartner: SelectItem[];
  validationform: FormGroup;
  submitted: boolean;

  Year: Array<number> = [2100, 2099, 2098, 2097, 2096, 2095, 2094, 2093, 2092, 2091,
    2090, 2089, 2088, 2087, 2086, 2085, 2084, 2083, 2082, 2081,
    2080, 2079, 2078, 2077, 2076, 2075, 2074, 2073, 2072, 2071,
    2070, 2069, 2068, 2067, 2066, 2065, 2064, 2063, 2062, 2061,
    2060, 2059, 2058, 2057, 2056, 2055, 2054, 2053, 2052, 2051,
    2050, 2049, 2048, 2047, 2046, 2045, 2044, 2043, 2042, 2041,
    2040, 2039, 2038, 2037, 2036, 2035, 2034, 2033, 2032, 2031,
    2030, 2029, 2028, 2027, 2026, 2025, 2024, 2023, 2022, 2021,
    2020, 2019, 2018, 2017, 2016, 2015, 2014, 2013, 2012, 2011,
    2010, 2009, 2008, 2007, 2006, 2005, 2004, 2003, 2002, 2001,
    2000, 1999, 1998, 1997, 1996, 1995, 1994, 1993, 1992, 1991,
    1990, 1989, 1988, 1987, 1986, 1985, 1984, 1983, 1982, 1981,
    1980, 1979, 1978, 1977, 1976, 1975, 1974, 1973, 1972, 1971,
    1970, 1969, 1968, 1967, 1966, 1965, 1964, 1963, 1962, 1961,
    1960, 1959, 1958, 1957, 1956, 1955, 1954, 1953, 1952, 1951,
    1950, 1949, 1948, 1947, 1946, 1945, 1944, 1943, 1942, 1941,
    1940, 1939, 1938, 1937, 1936, 1935, 1934, 1933, 1932, 1931,
    1930, 1929, 1928, 1927, 1926, 1925, 1924, 1923, 1922, 1921,
    1920, 1919, 1918, 1917, 1916, 1915, 1914, 1913, 1912, 1911,
    1910, 1909, 1908, 1907, 1906, 1905, 1904, 1903, 1902, 1901];
  
  Category: Array<string> = ['A', 'B', 'C'];
  Model: Array<string> = ['A', 'B', 'C'];



  constructor(private serviceBase1: EwoService, private service: BaseService, public formBuilder: FormBuilder) { super(serviceBase1); }

  ngOnInit() {
    this.service.entity = this.entityapi = 'utilaj';

    this.validationform = this.formBuilder.group({
      id: [''],
      name: ['', [Validators.required]],
      category: ['', [Validators.required]],
      producer: ['', [Validators.required]],
      model: ['', [Validators.required]],
      regName: ['', [Validators.required]],
      year: ['', [Validators.required]],
      obs: ['', [Validators.required]],
    });

    this.service.findAllItems().subscribe((all) => {
      this.list = all;
      console.log(this.list);
      this.columns = [];
      if (this.list && this.list.length > 0)
        for (var k in this.list[0]) {

          if (k != 'id')
            this.columns.push(k);
        }
    });



    super.ngOnInit();
  }

  add() {
    this.submitted = false;
    this.validationform.reset();
    this.item = new UtilajCls();

    this.displayDialog1 = true;
  }

  edit() {
    if (!this.validSelection(this.selectedItems))
      return;

    this.submitted = false;
    this.item = JSON.parse(JSON.stringify(this.selectedItems)) as UtilajCls;
    this.validationform.patchValue(this.item);
    this.displayDialog1 = true;
  }

  onRowDblClick(event, data) {
    this.selectedItems = data;
    this.edit();
  }

  onSubmit(values: object) {
    (values['id']) ? this.updateItem(values) : this.createItem(values);
    this.submitted = true;
  }

  createItem(data) {

    this.item = data;
    this.item['id'] = this.guid();
    this.item['state'] = this.selection;



    if (this.validationform.valid) {

      this.service._createItem(this.item).subscribe((data: any) => {

        this.list.unshift(this.item);
        this.validationform.reset();

        this.item = null;
        this.selectedItems = null;
        this.displayDialog1 = false;
      });
    }

  }

  updateItem(data) {

    if (this.validationform.valid) {

      this.item = data;

      this.service.updateItem(this.item['id'], this.item).subscribe(
        data => {

          this.list[this.findSelectedItem(this.list, this.selectedItems)] = this.item;
          this.validationform.reset();

          this.item = null;
          this.selectedItems = null;
          this.displayDialog1 = false;
        });
    }

  }

  delete() {
    if (!this.validSelection(this.selectedItems) || !confirm("Continue?"))
      return;

    let data = this.selectedItems;

    //for (var i = 0; i < this.selectedItems.length; i++) {
    this.service.deleteItem(data['id']).subscribe(res => {
      this.list.splice(this.findSelectedItem(this.list, data), 1);
    });
    //}

    this.selectedItems = null;
  }

  exportPdf() {
    import("jspdf").then(jsPDF => {
      import("jspdf-autotable").then(x => {
        const doc = new jsPDF.default(0, 0);
        doc.autoTable(this.columns, this.list);
        doc.save('primengTable.pdf');
      })
    })
  }

  exportExcel() {
    import("xlsx").then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(this.list);
      const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, "primengTable");
    });
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    import("file-saver").then(FileSaver => {
      let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
      let EXCEL_EXTENSION = '.xlsx';
      const data: Blob = new Blob([buffer], {
        type: EXCEL_TYPE
      });
      FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
    });
  }

  get form() {
    return this.validationform.controls;
  }




}
