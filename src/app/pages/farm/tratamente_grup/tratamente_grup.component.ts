import { filter } from "rxjs/operators";
import { Subscription } from "rxjs";

import { Observable } from "rxjs";
import {
  Component,
  OnInit,
  ViewChild,
  Input,
  AfterViewInit
} from "@angular/core";
import { Base } from "../../_ewo/base";
import { EwoColumn, EwoProperty } from "../../_ewo/model/model";
import {
  SelectItem,
  LazyLoadEvent,
  FilterMetadata
} from "primeng/components/common/api";
import { constants } from "./constants";
import { ajax } from "rxjs/ajax";

import { BaseService as EwoService } from "../../_ewo/service/service";

import { TratamenteCls } from "./tratamente.model";

import { BaseService } from "../../_services/base.service";
import { TabsetComponent } from "ngx-bootstrap/tabs";
import { Validators, FormGroup, FormBuilder } from "@angular/forms";
// import { ChartComponent } from 'ng-apexcharts/lib/chart/chart.component';


@Component({
  selector: "app-anitratgrp",
  templateUrl: "./tratamente_grup.component.html",
  styleUrls: ["./tratamente_grup.component.scss"],
  providers: [EwoService, BaseService]
})
export class TratamenteGrpComponent extends Base implements OnInit, AfterViewInit {
  @ViewChild("tabset", { static: false }) tabset: TabsetComponent;

  // @ViewChild('chart', { static: true }) chart: ChartComponent;
  breadCrumbItems: Array<{}>;
  selection: string;

  list: TratamenteCls[];
  columns: any[];
  item: TratamenteCls = new TratamenteCls();
  selectedItems: TratamenteCls[];
  value: Date;
  listpartner: SelectItem[];
  validationform: FormGroup;
  submitted: boolean;

  allObjectsRegArr: Array<object>;
  uniqueGrpIds: Array<string> = [];
  AnimalId: Array<string> = [];
  AnimalIdObjects: Array<object> = [];

  subscribeGrpIds: Subscription;
  toggleView: boolean = false;
  Sex: Array<string> = constants.Sex;
  MeasurementUnit: Array<string> = constants.MeasurementUnit;
  MeasurementUnit2: Array<string> = constants.MeasurementUnit2;
  AdmType: Array<string> = constants.AdmType;
  Age: Array<number> = constants.Age;

  selectedName: string = "...";
  chartData: Array<any>;

  constructor(
    private serviceBase1: EwoService,
    private service: BaseService,
    public formBuilder: FormBuilder
  ) {
    super(serviceBase1);
  }

  ngOnInit() {
    this.service.entity = this.entityapi = "treatments";
    this.validationform = this.formBuilder.group({
      id: [""],
      animalId: [""],
      grpId: [""],
      grpAdm: [""],
      vetName: [""],
      age: ["", [Validators.required]],
      sex: [""],
      gestating: [""],
      weight: ["", [Validators.required]],
      temp: ["", [Validators.required]],
      treatmentApplied: ["", [Validators.required]],
      qty: ["", [Validators.required]],
      measurementUnit: ["", [Validators.required]],
      measurementUnit2: ["", [Validators.required]],
      admType: ["", [Validators.required]],
      treatmentDate: ["", [Validators.required]],
      obs: ["", [Validators.required]]
    });

    this.service.findAllItems().subscribe(all => {
      this.chartData = this.list = all;
      console.log(this.list);
      this.columns = [];
      if (this.list && this.list.length > 0)
        for (var k in this.list[0]) {
          if (k != "id") this.columns.push(k);
        }
    });
 
    this.service.getAliasTableData("uniquegrpids").subscribe(data => {      
      this.allObjectsRegArr = data;
      console.log(data);      
    });
    super.ngOnInit();
  }

  ngAfterViewInit() {
 
  }

 

  filterIdsByGrps() {
    if (this.toggleView === false) {
      let grpName = this.validationform.get("grpId").value;
      this.AnimalId = this.allObjectsRegArr
        .filter(grpId => {
          // console.log(this.AnimalId.length);
          return grpId["grpId"] == grpName;
        })
        .map(grpId => grpId["id"]);
      console.log(this.AnimalId);
      return this.AnimalId;
    } else {
      let grpName = this.validationform.get("grpId").value;
      this.AnimalIdObjects = this.allObjectsRegArr.filter(grpId => {
        // console.log(this.AnimalIdObjects.length);
        console.log(this.AnimalIdObjects);
        return grpId["grpId"] == grpName;
      });
      console.log(this.AnimalIdObjects);
    }
  }

  handlegrpAdm($event) {
    if ($event.target.checked) {
      this.toggleView = true;
      this.form.grpAdm.patchValue(1);
    } else if (this.form.grpAdm.value === undefined || null) {
      this.form.grpAdm.patchValue(0);
    } else if (
      this.form.grpAdm.value === true &&
      $event.target.checked === false
    ) {
      this.form.grpAdm.patchValue(0);
    }

    if (!$event.target.checked) {
      this.toggleView = false;
    }
    console.log(this.toggleView);
    console.log("$event.target.checked :" + $event.target.checked);
    console.log("$event.target.value :" + $event.target.value);
    console.log("this.form.grpAdm.value :" + this.form.grpAdm.value);
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


  add() {
    this.submitted = false;
    this.validationform.reset();
    this.item = new TratamenteCls();

    this.displayDialog1 = true;
  }

  edit() {
    if (!this.validSelection(this.selectedItems)) return;

    this.submitted = false;
    this.item = JSON.parse(JSON.stringify(this.selectedItems)) as TratamenteCls;
    this.validationform.patchValue(this.item);
    this.displayDialog1 = true;
    if (this.validationform.get("grpId").value) {
      this.toggleView = true;
    } else {
      this.toggleView = false;
    }
  }

  onRowDblClick(event, data) {
    this.selectedItems = data;
    this.edit();
  }

  onSubmit(values: object) {
    values["id"] ? this.updateItem(values) : this.createItem(values);
    this.submitted = true;
  }

  createItem(data) {
    this.item = data;
    this.item["id"] = this.guid();
    this.item["state"] = this.selection;

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

      this.service.updateItem(this.item["id"], this.item).subscribe(data => {
        this.list[
          this.findSelectedItem(this.list, this.selectedItems)
        ] = this.item;
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
    this.service.deleteItem(data["id"]).subscribe(res => {
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
        doc.save("primengTable.pdf");
      });
    });
  }

  exportExcel() {
    import("xlsx").then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(this.list);
      const workbook = { Sheets: { data: worksheet }, SheetNames: ["data"] };
      const excelBuffer: any = xlsx.write(workbook, {
        bookType: "xlsx",
        type: "array"
      });
      this.saveAsExcelFile(excelBuffer, "primengTable");
    });
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    import("file-saver").then(FileSaver => {
      let EXCEL_TYPE =
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
      let EXCEL_EXTENSION = ".xlsx";
      const data: Blob = new Blob([buffer], {
        type: EXCEL_TYPE
      });
      FileSaver.saveAs(
        data,
        fileName + "_export_" + new Date().getTime() + EXCEL_EXTENSION
      );
    });
  }



  get form() {
    return this.validationform.controls;
  }



}
