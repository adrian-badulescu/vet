import { Observable, ObjectUnsubscribedError, Subscription, of } from "rxjs";
import { Component, OnInit, ViewChild, Input, OnDestroy } from "@angular/core";
import { Base } from "../../_ewo/base";
import { EwoColumn, EwoProperty } from "../../_ewo/model/model";
import {
  SelectItem,
  LazyLoadEvent,
  FilterMetadata
} from "primeng/components/common/api";
import { animalNames, age } from "./animals";
import { BaseService as EwoService } from "../../_ewo/service/service";

import { RegCls } from "./reg.model";
import { NgxSmartModalService } from "ngx-smart-modal";
import { BaseService } from "../../_services/base.service";
import { TabsetComponent } from "ngx-bootstrap/tabs";
import { Validators, FormGroup, FormBuilder } from "@angular/forms";
import { CalcAgeService } from "../calc-age.service";

import { from } from "rxjs";
import { PostingConfirmationService } from "./posting-confirmation.service";
import { count, map, take, delay, concatMap } from "rxjs/operators";

@Component({
  selector: "app-anireg",
  templateUrl: "./reg.component.html",
  styleUrls: ["./reg.component.scss"],
  providers: [EwoService, BaseService, CalcAgeService]
})
export class RegComponent extends Base implements OnInit {
  @ViewChild("tabset", { static: false }) tabset: TabsetComponent;

  breadCrumbItems: Array<{}>;
  selection: string;
  itemId: string = "";
  list: RegCls[];
  columns: any[];
  item: RegCls = new RegCls();
  selectedItems: RegCls[];
  value: Date;

  article: RegCls;
  article_org: RegCls;

  listpartner: SelectItem[];
  validationform: FormGroup;
  regIds: Array<RegCls> = [];
  regIds_deleted: Array<RegCls> = [];

  submitted: boolean;

  Sex: Array<string> = ["M", "F"];

  toggleView: boolean = false;
  date: Date = new Date();
  exitDate: string;

  Breed: Array<string> = [];
  bovines: Array<string> = animalNames.bovines;
  Species: Array<string> = animalNames.species;
  sheeps: Array<string> = animalNames.sheeps;
  goats: Array<string> = animalNames.goats;
  pigs: Array<string> = animalNames.pigs;
  horses: Array<string> = animalNames.horses;
  birds: Array<string> = animalNames.birds;
  stage: Array<string> = animalNames.stage;
  MeatOrMilk: Array<string> = animalNames.meatMilk;
  Age: Array<number> = age;

  listByGrp: Array<any> = [];

  listByIds: Array<any> = [];
  listAll: Array<any> = [];
  birthArr: Array<object> = [{}];

  selectedName: string = "...";

  masterTotal: number;
  addIndividualIds: boolean = true;

  list2: Array<object> = [{}];
  list2$: Observable<any>;
  private subscription: Subscription;
  dataToPrint = [];
  animalId: string;
  grpId: string;
  regGrpId: string;
  generatedGroup: string = "Grup generat: ";
  age: any;

  constructor(
    public ngxSmartModalService: NgxSmartModalService,
    private serviceBase1: EwoService,
    private service: BaseService,
    public formBuilder: FormBuilder,
    private calculateStage: CalcAgeService,
    private matching: PostingConfirmationService
  ) {
    super(serviceBase1);
  }

  ngOnInit() {
    this.service.entity = this.entityapi = "reg";
    // this.service.getAllViews('reg_view');
    this.getAll();
    this.validationform = this.formBuilder.group({
      id: [""],
      total: ['', [Validators.required]],
      species: ["", [Validators.required]],
      breed: ["", [Validators.required]],
      sex: ["", [Validators.required]],
      creationDate: [""],
      crotaliuId: [""],
      dateOfBirth: [""],
      meatOrMilk: [""],
      gestating: [""],
      parentMId: [""],
      parentFId: [""],
      weight: [""],
      exitDate: [""]
    });

    super.ngOnInit();
  }
  getAll() {
    this.service.findAllItems().subscribe(all => {
      this.list = all;
      console.log(this.list);
      this.columns = [];
      if (this.list && this.list.length > 0)
        for (var k in this.list[0]) {
          if (k != "id") this.columns.push(k);
        }
      this.birthArr = [];
      for (let i = 0; i < this.list.length; i++) {
        this.list[i].age = this.calculateStage.calcAge(
          this.list[i].dateOfBirth
        );
      }
    });
  }

  calcAge() {
    this.calculateStage.calcAge(this.validationform.get("dateOfBirth").value);
  }

  createGrpId(): string {
    this.regGrpId =
      this.validationform.get("species").value +
      "-" +
      this.validationform.get("breed").value +
      "-" +
      this.validationform.get("sex").value;
    this.addIndividualIds = false;
    return this.regGrpId;
  }

  createPseudoItem() {
    this.multiplierIds(this.validationform.get("total").value);


    this.list2$.subscribe(data => {
      console.log(data);
      this.item = data as RegCls;

      this.service._createItem(this.item).subscribe(
        data => {
          this.list.unshift(this.item);

          this.validationform.reset();

          this.item = null;
          this.selectedItems = null;
          this.displayDialog1 = false;
        },
        this.err,
        this.complete
      );
    });

    // this.matching.loadDataA();
    // this.matching.loadDataB();

    this.list2 = [];
  }

  // ngOnDestroy() {
  //   this.subscription.unsubscribe();
  // }
  err() {
    console.log("error");
  }
  complete() {
    // this.matching.reset();
  }

  multiplierIds(ntimes) {
    this.list2 = [];
    for (let i = 0; i < ntimes; i++) {
      this.list2.push({        
        grpId: this.createGrpId(),        
        species: this.validationform.get("species").value,
        breed: this.validationform.get("breed").value,
        sex: this.validationform.get("sex").value,
        creationDate: this.validationform.get("creationDate").value,
        dateOfBirth: this.validationform.get("dateOfBirth").value,
        meatOrMilk: this.validationform.get("meatOrMilk").value,
        gestating: this.validationform.get("gestating").value,
        parentMId: this.validationform.get("parentMId").value,
        parentFId: this.validationform.get("parentFId").value,
        weight: this.validationform.get("weight").value,
        exitDate: this.validationform.get("exitDate").value
      });
    }

    return (this.matching.compareA$ = this.list2$ = from(this.list2).pipe(
      concatMap(val => of(val).pipe(delay(50)))
    ));
  }

  multiplier(el, ntimes) {
    for (let i = 0; i < ntimes; i++) {
      this.list2.push(el);
    }
    return this.list2;
  }

  onSelect() {
    if (this.validationform.get("species").value === "Bovine") {
      this.Breed = this.bovines;
      this.selectedName = this.validationform.get("species").value;
    } else if (this.validationform.get("species").value === "Ovine") {
      this.Breed = this.sheeps;
      this.selectedName = this.validationform.get("species").value;
    } else if (this.validationform.get("species").value === "Caprine") {
      this.Breed = this.goats;
      this.selectedName = this.validationform.get("species").value;
    } else if (this.validationform.get("species").value === "Porcine") {
      this.Breed = this.pigs;
      this.selectedName = this.validationform.get("species").value;
    } else if (this.validationform.get("species").value === "Cabaline") {
      this.Breed = this.horses;
      this.selectedName = this.validationform.get("species").value;
    } else {
      this.Breed = this.birds;
      this.selectedName = this.validationform.get("species").value;
    }
  }

  add() {
    this.submitted = false;
    this.validationform.reset();
    this.item = new RegCls();
    this.displayDialog2 = false;
    this.displayDialog1 = true;
  }

  edit() {
    this.displayDialog1 = false;
    if (!this.validSelection(this.selectedItems)) return;

    this.submitted = false;
    this.item = JSON.parse(JSON.stringify(this.selectedItems)) as RegCls;
    this.validationform.patchValue(this.item);

    this.displayDialog2 = true;
  }

  onRowDblClick(event, data) {
    this.selectedItems = data;
    if (event) {
      this.edit();
    }
  }

  onSubmit(values: object) {
    this.submitted = true;
    this.updateItem(values);
  }

  updateItem(data) {
    if (this.validationform) {
      this.item = data;
      this.item.age = this.age;
      // this.item.creationDate = this.date.getFullYear() + '-' + this.date.getMonth() + '-' + this.date.getDay();
      this.item.exitDate = (this.validationform.get('exitDate').value).substring(0,10);
      
      console.log(data);

      this.service.updateItem(this.item["id"], this.item).subscribe(data => {
        this.list[
          this.findSelectedItem(this.list, this.selectedItems)
        ] = this.item;
        this.validationform.reset();

        this.item = null;
        this.selectedItems = null;
        this.displayDialog1 = false;
        this.displayDialog2 = true;
      });
    }
    this.getAll();
  }

  delete() {
    if (!this.validSelection(this.selectedItems) || !confirm("Continue?"))
      return;

    let data = this.selectedItems;

    this.service.deleteItem(data["id"]).subscribe(res => {
      this.list.splice(this.findSelectedItem(this.list, data), 1);
    });

    this.selectedItems = null;
  }

  get form() {
    return this.validationform.controls;
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

  handleGestating($event) {
    if ($event.target.checked) {
      this.form.gestating.patchValue(1);
    } else if (this.form.gestating.value === undefined || null) {
      this.form.gestating.patchValue(0);
    } else if (
      this.form.gestating.value === true &&
      $event.target.checked === false
    ) {
      this.form.gestating.patchValue(0);
    }

    console.log("$event.target.checked :" + $event.target.checked);
    console.log("$event.target.value :" + $event.target.value);
    console.log("this.form.gestating.value :" + this.form.gestating.value);
    // console.log('check :' + this.check);
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
}
