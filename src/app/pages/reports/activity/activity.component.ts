import { Component, OnInit, ViewChild, Input, Output } from "@angular/core";
import { FormControl } from "@angular/forms";
import { Base } from "../../_ewo/base";
import { EwoColumn, EwoProperty } from "../../_ewo/model/model";
import {
  SelectItem,
  LazyLoadEvent,
  FilterMetadata
} from "primeng/components/common/api";

import { BaseService as EwoService } from "../../_ewo/service/service";

import { ActivityReportsCls } from "./activity.model";

import { BaseService } from "../../_services/base.service";
import { TabsetComponent } from "ngx-bootstrap/tabs";
import { Validators, FormGroup, FormBuilder } from "@angular/forms";

@Component({
  selector: "app-actrep",
  templateUrl: "./activity.component.html",
  styleUrls: ["./activity.component.scss"],
  providers: [EwoService, BaseService]
})
export class ActivityReportComponent extends Base implements OnInit {
  @ViewChild("tabset", { static: false }) tabset: TabsetComponent;
  breadCrumbItems: Array<{}>;
  selection: string;

  list: ActivityReportsCls[];
  columns: any[];
  item: ActivityReportsCls = new ActivityReportsCls();
  selectedItems: ActivityReportsCls[];
  value: Date;
  listpartner: SelectItem[];
  validationform: FormGroup;
  submitted: boolean;

  activityReport: boolean = false;
  displayColActRep: boolean;
  personActivityReport: boolean = false;
  displayColPersActRep: boolean;
  cropReport: boolean = false;
  displayColCropRep: boolean;
  companyActivitiesReport: boolean = false;
  displayColCompActRep: boolean;
  generalReport: boolean = false;
  displayColGenRep: boolean;

  personFilter: boolean = false;
  fieldFilter: boolean = false;
  departmentFilter: boolean = false;
  seasonFilter: boolean = false;
  statusFilter: boolean = false;
  categoryFilter: boolean = false;
  afterDateFilter: boolean = false;
  beforeDateFilter: boolean = false;

  filterByPerson: Array<ActivityReportsCls> = [];
  filterByField: Array<ActivityReportsCls> = [];
  filterByDept: Array<ActivityReportsCls> = [];
  filterBySeason: Array<ActivityReportsCls> = [];
  filterByStatus: Array<ActivityReportsCls> = [];
  filterByCategory: Array<ActivityReportsCls> = [];
  filterByAfterThisDate: Array<ActivityReportsCls> = [];
  filterByBeforeThisDate: Array<ActivityReportsCls> = [];

  SelectReport: Array<string> = [
    "Activitate per Persoana",
    "Persoana Activitate per Teren",
    "Raport Culturi",
    "Activitati Companie",
    "General"
  ];
  Fields: Array<string> = [];
  Season: Array<string> = [];
  OwnerType: Array<string> = [];
  Dept: Array<string> = [];
  Cat: Array<string> = [];
  Person: Array<string> = [];
  Status: Array<string> = [];
  selectedReport = new FormControl("");
  constructor(
    private serviceBase1: EwoService,
    private service: BaseService,
    public formBuilder: FormBuilder
  ) {
    super(serviceBase1);
  }

  ngOnInit() {
    // this.canAdd = true;
    this.service.entity = this.entityapi = "activitate";
    this.validationform = this.formBuilder.group({
      id: [""],
      responsiblePers: [""],
      dept: [""],
      season: [""],
      startDate: [""],
      endDate: [""],
      state: [""],
      categories: [""],
      fields: [""]
    });

    this.service.findAllItems().subscribe(all => {
      this.list = all;
      // this.activityReport = true;

      console.log(this.list);
      this.columns = [];
      if (this.list && this.list.length > 0)
        for (var k in this.list[0]) {
          if (k != "id") this.columns.push(k);
        }
      for (let i = 0; i < this.list.length; i++) {
        this.Fields.push(this.list[i].fields);
        this.Season.push(this.list[i].season);
        this.Dept.push(this.list[i].dept);
        this.Cat.push(this.list[i].categories);
        this.Person.push(this.list[i].responsiblePers);
        this.Status.push(this.list[i].state);
        this.Fields = [...new Set(this.Fields)];
        this.Season = [...new Set(this.Season)];
        this.Dept = [...new Set(this.Dept)];
        this.Cat = [...new Set(this.Cat)];
        this.Person = [...new Set(this.Person)];
        this.Status = [...new Set(this.Status)];
      }
    });

    this.displayColActRep = true;
    super.ngOnInit();
  }
  refresh() {
    alert("Datele se vor reincarca din baza de date");
    this.refreshInner();
  }
  refreshInner() {
    this.service.findAllItems().subscribe(all => {
      this.list = all;
    });
  }

  onSelectFilterTrigger(e) {
    console.warn(e.target.name);
    if (e.target.name === "responsiblePers") {
      this.personFilter = true;
    }
    if (e.target.name === "dept") {
      this.departmentFilter = true;
    }
    if (e.target.name === "fields") {
      this.fieldFilter = true;
    }
    if (e.target.name === "season") {
      this.seasonFilter = true;
    }
    if (e.target.name === "state") {
      this.statusFilter = true;
    }
    if (e.target.name === "categories") {
      this.categoryFilter = true;
    }
    if (e.target.name === "startDate") {
      this.afterDateFilter = true;
    }
    if (e.target.name === "endDate") {
      this.beforeDateFilter = true;
    }
  }

  filter() {
    if (this.personFilter === true) {
      this.onSelectFilterByPerson();
    }
    if (this.fieldFilter === true) {
      this.onSelectFilterByField();
    }
    if (this.departmentFilter === true) {
      this.onSelectFilterByDept();
    }
    if (this.seasonFilter === true) {
      this.onSelectFilterBySeason();
    }
    if (this.statusFilter === true) {
      this.onSelectFilterByStatus();
    }
    if (this.categoryFilter === true) {
      this.onSelectFilterByCategory();
    }
    if (this.afterDateFilter === true) {
      this.onSelectFilterAfterDate();
    }
    if (this.beforeDateFilter === true) {
      this.onSelectFilterBeforeDate();
    }
  }

  onSelectFilterByPerson() {
    const responsiblePerson = this.validationform.get("responsiblePers").value;
    this.filterByPerson = this.list.filter(function(person) {
      return person.responsiblePers == responsiblePerson;
    });
    this.list = this.filterByPerson;
  }
  onSelectFilterByField() {
    const filterField = this.validationform.get("fields").value;
    this.filterByField = this.list.filter(function(field) {
      return field.fields == filterField;
    });
    this.list = this.filterByField;
  }
  onSelectFilterByDept() {
    const filterDept = this.validationform.get("dept").value;
    this.filterByDept = this.list.filter(function(dept) {
      return dept.dept == filterDept;
    });
    this.list = this.filterByDept;
  }
  onSelectFilterBySeason() {
    const filterSeason = this.validationform.get("season").value;
    this.filterBySeason = this.list.filter(function(seasons) {
      return seasons.season == filterSeason;
    });
    this.list = this.filterBySeason;
  }
  onSelectFilterByStatus() {
    const filterStatus = this.validationform.get("state").value;
    this.filterByStatus = this.list.filter(function(status) {
      return status.state == filterStatus;
    });
    this.list = this.filterByStatus;
  }

  onSelectFilterByCategory() {
    const filterCategory = this.validationform.get("categories").value;
    this.filterByCategory = this.list.filter(function(cat) {
      return cat.categories == filterCategory;
    });
    this.list = this.filterByCategory;
  }

  onSelectFilterAfterDate() {
    const afterDate = this.validationform.get("startDate").value;
    this.filterByAfterThisDate = this.list.filter(function(afterThisDate) {
      return afterThisDate.startDate >= afterDate;
    });
    this.list = this.filterByAfterThisDate;
  }

  onSelectFilterBeforeDate() {
    const beforeDate = this.validationform.get("endDate").value;
    this.filterByBeforeThisDate = this.list.filter(function(beforeThisDate) {
      return beforeThisDate.endDate <= beforeDate;
    });
    this.list = this.filterByBeforeThisDate;
  }

  // console.log(this.validationform.get('responsiblePers').value);
  onSelect() {
    if (this.selectedReport.value === "Activitate per Persoana") {
      this.activityReport = this.displayColActRep = true;
      this.personActivityReport = this.cropReport = this.companyActivitiesReport = this.generalReport = false;
      this.displayColPersActRep = this.displayColCropRep = this.displayColCompActRep = this.displayColGenRep = false;
    } else if (this.selectedReport.value === "Persoana Activitate per Teren") {
      this.personActivityReport = this.displayColPersActRep = true;
      this.activityReport = this.cropReport = this.companyActivitiesReport = this.generalReport = false;
      this.displayColActRep = this.displayColCropRep = this.displayColCompActRep = this.displayColGenRep = false;
    } else if (this.selectedReport.value === "Raport Culturi") {
      this.cropReport = this.displayColCropRep = true;
      this.activityReport = this.personActivityReport = this.companyActivitiesReport = this.generalReport = false;
      this.displayColActRep = this.displayColPersActRep = this.displayColCompActRep = this.displayColGenRep = false;
    } else if (this.selectedReport.value === "Activitati Companie") {
      this.companyActivitiesReport = this.displayColCompActRep = true;
      this.activityReport = this.personActivityReport = this.cropReport = this.generalReport = false;
      this.displayColActRep = this.displayColPersActRep = this.displayColCropRep = this.displayColGenRep = false;
    } else {
      this.generalReport = this.displayColGenRep = true;
      this.activityReport = this.personActivityReport = this.cropReport = this.companyActivitiesReport = false;
      this.displayColActRep = this.displayColPersActRep = this.displayColCropRep = this.displayColCompActRep = false;
    }

    console.log(this.selectedReport.value);
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

  generateReportPdf() {
    return this.exportPdf();
  }
  generateReportExcel() {
    return this.exportExcel();
  }
}
