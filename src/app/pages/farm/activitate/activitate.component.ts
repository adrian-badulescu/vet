import { Component, OnInit, ViewChild } from "@angular/core";
import { Base } from "../../_ewo/base";
import { EwoColumn, EwoProperty } from "../../_ewo/model/model";
import {
  SelectItem,
  LazyLoadEvent,
  FilterMetadata
} from "primeng/components/common/api";
import { constants } from "./constants";
import { BaseService as EwoService } from "../../_ewo/service/service";

import { ActivitateCls } from "./activitate.model";

import { BaseService } from "./../../_services/base.service";
import { TabsetComponent } from "ngx-bootstrap/tabs";
import { Validators, FormGroup, FormBuilder } from "@angular/forms";

@Component({
  selector: "app-activitate",
  templateUrl: "./activitate.component.html",
  styleUrls: ["./activitate.component.scss"],
  providers: [EwoService, BaseService]
})
export class ActivitateComponent extends Base implements OnInit {
  @ViewChild("tabset", { static: false }) tabset: TabsetComponent;
  breadCrumbItems: Array<{}>;
  selection: string;

  list: ActivitateCls[];
  columns: any[];
  item: ActivitateCls = new ActivitateCls();
  selectedItems: ActivitateCls[];
  value: Date;
  listpartner: SelectItem[];
  validationform: FormGroup;
  submitted: boolean;

  toggle1: boolean = false;
  toggle2: boolean = false;
  toggle3: boolean = false;

  selectedName: string = "...";
  ResponsiblePers: Array<string> = constants.ResponsiblePers;
  Categories: Array<string> = constants.Categories;
  SubCategories: Array<string> = constants.SubCategories;
  Fields: Array<string> = constants.Fields;
  Season: Array<string> = constants.Season;
  CultureProduction: Array<string> = constants.CultureProduction;
  soilAnalisys: Array<string> = constants.soilAnalisys;
  fertilisation: Array<string> = constants.fertilisation;
  tillage: Array<string> = constants.tillage;
  planting: Array<string> = constants.planting;
  treatments: Array<string> = constants.treatments;
  maintainance: Array<string> = constants.maintainance;
  inspections: Array<string> = constants.inspections;
  cuts: Array<string> = constants.cuts;
  irigations: Array<string> = constants.irigations;
  harvesting: Array<string> = constants.harvesting;
  processing: Array<string> = constants.processing;
  storage: Array<string> = constants.storage;

  constructor(
    private serviceBase1: EwoService,
    private service: BaseService,
    public formBuilder: FormBuilder
  ) {
    super(serviceBase1);
  }

  ngOnInit() {
    this.service.entity = this.entityapi = "activitate";
    this.validationform = this.formBuilder.group({
      id: [""],
      name: ["", [Validators.required]],
      startDate: ["", [Validators.required]],
      endDate: ["", [Validators.required]],
      state: ["", [Validators.required]],
      responsiblePers: ["", [Validators.required]],
      categories: ["", [Validators.required]],
      subCategories: ["", [Validators.required]],
      fields: ["", [Validators.required]],
      cultureProduction: ["", [Validators.required]],
      season: ["", [Validators.required]],
      seasonStartDate: ["", [Validators.required]],
      seasonEndDate: ["", [Validators.required]],
      obs: ["", [Validators.required]]
    });

    this.service.findAllItems().subscribe(all => {
      this.list = all;
      console.log(this.list);
      this.columns = [];
      if (this.list && this.list.length > 0)
        for (var k in this.list[0]) {
          if (k != "id") this.columns.push(k);
        }
    });

    super.ngOnInit();
  }

  onSelect() {
    if (this.validationform.get("categories").value === "Analiza Chimica") {
      this.SubCategories = this.soilAnalisys;
      this.selectedName = this.validationform.get("categories").value;
    } else if (this.validationform.get("categories").value === "Fertilizare") {
      this.SubCategories = this.fertilisation;
      this.selectedName = this.validationform.get("categories").value;
    } else if (this.validationform.get("categories").value === "Araturi") {
      this.SubCategories = this.tillage;
      this.selectedName = this.validationform.get("categories").value;
    } else if (this.validationform.get("categories").value === "Plantari") {
      this.SubCategories = this.planting;
      this.selectedName = this.validationform.get("categories").value;
    } else if (this.validationform.get("categories").value === "Tratamente") {
      this.SubCategories = this.treatments;
      this.selectedName = this.validationform.get("categories").value;
    } else if (
      this.validationform.get("categories").value === "Lucrari de Mantenanta"
    ) {
      this.SubCategories = this.treatments;
      this.selectedName = this.validationform.get("categories").value;
    } else if (this.validationform.get("categories").value === "Inspectii") {
      this.SubCategories = this.inspections;
      this.selectedName = this.validationform.get("categories").value;
    } else if (this.validationform.get("categories").value === "Taieri") {
      this.SubCategories = this.cuts;
      this.selectedName = this.validationform.get("categories").value;
    } else if (this.validationform.get("categories").value === "Irigatii") {
      this.SubCategories = this.irigations;
      this.selectedName = this.validationform.get("categories").value;
    } else if (this.validationform.get("categories").value === "Recoltare") {
      this.SubCategories = this.harvesting;
      this.selectedName = this.validationform.get("categories").value;
    } else if (this.validationform.get("categories").value === "Procesare") {
      this.SubCategories = this.processing;
      this.selectedName = this.validationform.get("categories").value;
    } else if (this.validationform.get("categories").value === "Depozitare") {
      this.SubCategories = this.storage;
      this.selectedName = this.validationform.get("categories").value;
    }
  }

  add() {
    this.submitted = false;
    this.validationform.reset();
    this.item = new ActivitateCls();

    this.displayDialog1 = true;
  }

  edit() {
    if (!this.validSelection(this.selectedItems)) return;

    this.submitted = false;
    this.item = JSON.parse(JSON.stringify(this.selectedItems)) as ActivitateCls;
    this.validationform.patchValue(this.item);
    // this.checkedNonStock();
    this.displayDialog1 = true;
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

  handleWaste($event) {
    if ($event.target.checked) {
      this.form.waste.patchValue(1);
    } else if (this.form.waste.value === undefined || null) {
      this.form.waste.patchValue(0);
    } else if (
      this.form.waste.value === true &&
      $event.target.checked === false
    ) {
      this.form.waste.patchValue(0);
    }

    console.log("$event.target.checked :" + $event.target.checked);
    console.log("$event.target.value :" + $event.target.value);
    console.log("this.form.waste.value :" + this.form.waste.value);
    // console.log('check :' + this.check);
  }

  select($event) {
    this.selection = $event.target.value;
    // this.toggleBtns = !this.toggleBtns;
    console.log(this.selection);
  }
  toggleBtn1() {
    this.toggle1 = true;
    this.toggle2 = false;
    this.toggle3 = false;
  }
  toggleBtn2() {
    this.toggle2 = true;
    this.toggle1 = false;
    this.toggle3 = false;
  }
  toggleBtn3() {
    this.toggle3 = true;
    this.toggle1 = false;
    this.toggle2 = false;
  }
}
