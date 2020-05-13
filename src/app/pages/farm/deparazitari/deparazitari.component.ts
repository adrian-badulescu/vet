import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Base } from '../../_ewo/base';
import { EwoColumn, EwoProperty } from '../../_ewo/model/model';
import { SelectItem, LazyLoadEvent, FilterMetadata } from 'primeng/components/common/api';

import { BaseService as EwoService } from '../../_ewo/service/service';

import { DeparazitariCls, ChartType } from './deparazitari.model';

import { BaseService } from '../../_services/base.service';
import { TabsetComponent } from 'ngx-bootstrap/tabs'
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
// import { ChartComponent } from 'ng-apexcharts/lib/chart/chart.component';
import { ChartComponent, ApexChart, ApexFill, ApexAxisChartSeries, ApexAnnotations, ApexNonAxisChartSeries, ApexLegend, ApexPlotOptions, ApexTooltip, ApexDataLabels, ApexStroke, ApexResponsive, ApexXAxis, ApexYAxis, ApexGrid, ApexStates, ApexTitleSubtitle, ApexTheme } from 'ng-apexcharts';

@Component({
  selector: 'app-anideparasites',
  templateUrl: './deparazitari.component.html',
  styleUrls: ['./deparazitari.component.scss'],
  providers: [EwoService, BaseService]
})
export class DeparazitariComponent extends Base implements OnInit {
  @ViewChild('tabset', { static: false }) tabset: TabsetComponent;

  // @ViewChild('chart', { static: true }) chart: ChartComponent;
  breadCrumbItems: Array<{}>;
  selection: string;



  list: DeparazitariCls[];
  columns: any[];
  item: DeparazitariCls = new DeparazitariCls();
  selectedItems: DeparazitariCls[];
  value: Date;
  listpartner: SelectItem[];
  validationform: FormGroup;
  submitted: boolean;

  Sex: Array<string> = ['M', 'F'];

  toggleView: boolean = false;

  MeasurementUnit: Array<string> = ['u.i.', 'Mg', 'μg', 'ng', 'g', 'mL'];
  MeasurementUnit2: Array<string> = ['L', 'Kg', 'u.i.', 'Mg', 'μg', 'ng', 'g', 'mL'];
  AdmType: Array<string> = ['per os', 'intra muscular', 'intra venos', 'intra arterial', 'sub cutanat', 'intra cutan', 'cutanat', 'inhalat', 'intra rectal', 'intra vaginal', 'ocular'];

  Age: Array<number> = [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1, 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9, 2, 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7, 2.8, 2.9, 3, 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7, 3.8, 3.9, 4, 4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 4.7, 4.8, 4.9, 5, 5.1, 5.2, 5.3, 5.4, 5.5, 5.6, 5.7, 5.8, 5.9, 6, 6.1, 6.2, 6.3, 6.4, 6.5, 6.6, 6.7, 6.8, 6.9, 7, 7.1, 7.2, 7.3, 7.4, 7.5, 7.6, 7.7, 7.8, 7.9, 8, 8.1, 8.2, 8.3, 8.4, 8.5, 8.6, 8.7, 8.8, 8.9, 9, 9.1, 9.2, 9.3, 9.4, 9.5, 9.6, 9.7, 9.8, 9.9, 10, 10.1, 10.2, 10.3, 10.4, 10.5, 10.6, 10.7, 10.8, 10.9, 11, 11.1, 11.2, 11.3, 11.4, 11.5, 11.6, 11.7, 11.8, 11.9, 12,];

  selectedName: string = '...';
  chartData: Array<any>;

  constructor(private serviceBase1: EwoService, private service: BaseService, public formBuilder: FormBuilder) { super(serviceBase1); }

  ngOnInit() {
    this.service.entity = this.entityapi = 'desinfestations';
    this.validationform = this.formBuilder.group({
      id: [''],
      animalId: [''],
      grpId: [''],
      grpAdm: [''],
      vetName: [''],
      age: ['', [Validators.required]],
      sex: [''],
      gestating: [''],
      weight: ['', [Validators.required]],
      temp: ['', [Validators.required]],
      desinfestationApplied: ['', [Validators.required]],
      qty: ['', [Validators.required]],
      measurementUnit: ['', [Validators.required]],
      measurementUnit2: ['', [Validators.required]],
      admType: ['', [Validators.required]],
      desinfestationDate: ['', [Validators.required]],
      obs: ['', [Validators.required]]
    });

    this.service.findAllItems().subscribe((all) => {



      this.chartData = this.list = all;
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



  handlegrpAdm($event) {
    if ($event.target.checked) {
      this.toggleView = true;
      this.form.grpAdm.patchValue(1);
    } else if (this.form.grpAdm.value === undefined || null) { this.form.grpAdm.patchValue(0); }
    else if (this.form.grpAdm.value === true && $event.target.checked === false) { this.form.grpAdm.patchValue(0) }

    if (!$event.target.checked) { this.toggleView = false; }
    console.log('$event.target.checked :' + $event.target.checked);
    console.log('$event.target.value :' + $event.target.value);
    console.log('this.form.grpAdm.value :' + this.form.grpAdm.value);
  }
  grpAdm(): boolean {
    if (this.form.grpAdm.value) {
      return true;
    } else if (this.form.grpAdm.value === undefined) {
      return false;
    } else if (this.form.grpAdm.value === null) {
      return false;
    } else if (!this.form.grpAdm.value) {
      return false;
    }
  }

  handleGestating($event) {
    if ($event.target.checked) {
      this.form.gestating.patchValue(1);
    } else if (this.form.gestating.value === undefined || null) { this.form.gestating.patchValue(0); }
    else if (this.form.gestating.value === true && $event.target.checked === false) { this.form.gestating.patchValue(0) }

    console.log('$event.target.checked :' + $event.target.checked);
    console.log('$event.target.value :' + $event.target.value);
    console.log('this.form.gestating.value :' + this.form.gestating.value);

  }
  gestating(): boolean {
    if (this.form.gestating.value) {
      return true;
    } else if (this.form.gestating.value === undefined) {
      return false;
    } else if (this.form.gestating.value === null) {
      return false;
    } else if (!this.form.gestating.value) {
      return false;
    }
  }

  add() {
    this.submitted = false;
    this.validationform.reset();
    this.item = new DeparazitariCls();

    this.displayDialog1 = true;
  }

  edit() {
    if (!this.validSelection(this.selectedItems))

      return;

    this.submitted = false;
    this.item = JSON.parse(JSON.stringify(this.selectedItems)) as DeparazitariCls;
    this.validationform.patchValue(this.item);
    this.displayDialog1 = true;
    if (this.validationform.get('grpId').value) {
      this.toggleView = true;
    }
    else {
      this.toggleView = false;
    }
  }

  onRowDblClick(event, data) {
    this.selectedItems = data;
    // this.checkedNonStock();
    console.log(this.form.nonstock.value);
    // console.log(this.checkedNonStock());
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



    if (this.validationform) {

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

    if (this.validationform) {

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
