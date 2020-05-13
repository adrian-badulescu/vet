import { Component, OnInit, ViewChild } from "@angular/core";
import { Base } from "../../_ewo/base";
import { EwoColumn, EwoProperty } from "../../_ewo/model/model";
import {
  SelectItem,
  LazyLoadEvent,
  FilterMetadata
} from "primeng/components/common/api";
import { BaseService as EwoService } from "../../_ewo/service/service";
import { nutritionSources } from "./nutrients";
import { FeedPlanningCls } from "./furajare.model";
import { BaseService } from "../../_services/base.service";
import { TabsetComponent } from "ngx-bootstrap/tabs";
import { Validators, FormGroup, FormBuilder } from "@angular/forms";

@Component({
  selector: "app-furajare",
  templateUrl: "./furajare.component.html",
  styleUrls: ["./furajare.component.scss"],
  providers: [EwoService, BaseService]
})
export class FurajareComponent extends Base implements OnInit {
  @ViewChild("tabset", { static: false }) tabset: TabsetComponent;
  breadCrumbItems: Array<{}>;
  selection: string;

  list: FeedPlanningCls[];
  columns: any[];
  item: FeedPlanningCls = new FeedPlanningCls();
  selectedItems: FeedPlanningCls[];
  value: Date;
  listpartner: SelectItem[];
  validationform: FormGroup;
  submitted: boolean;

  // toggle1: boolean = false;
  // toggle2: boolean = false;
  // toggle3: boolean = false;

  nutritionSource = nutritionSources;
  milkLitersYear: number = null;
  DM: number = null; // dry matter (%)
  ME: number = null; // (metabolisable energy)-megajoules/Kg dry matter(MJ/ kg DM)
  CP: number = null; // (crude protein)-g/Kg DM
  totalEnergy1Y_ME: number; // Total energy requirement for farm (MJ ME)
  totalGrassAndForageEnergySupply: number; // Total grass and forage energy supply (MJ ME)
  calculusGrazing: number; // ex:2t DM/ha at 10.0 MJ ME/kg DM)
  totalBoughtEnergySupply: number; // Total bought-in feed energy supply (MJ ME)
  totalFarmEnergySupply: number; // totalBoughtEnergySupply + totalGrassAndForageEnergySupply
  demand: number = 0; // totalEnergy1Y_ME line45
  balance: number = 0; // (totalFarmEnergySupply - demand)
  supply: number = 0;
  minus: number = 0;
  plusMinus: string = '';



  constructor(
    private serviceBase1: EwoService,
    private service: BaseService,
    public formBuilder: FormBuilder
  ) {
    super(serviceBase1);
  }

  ngOnInit() {
    this.service.entity = this.entityapi = "furajarebeef";
    this.validationform = this.formBuilder.group({
      id: [""],
      grpId: ["", [Validators.required]],
      
      DM: ["", [Validators.required]],
      ME: ["", [Validators.required]],
      CP: ["", [Validators.required]],
      // anual energy demand
      suckerCows500Kg: ["", [Validators.required]],
      InCalfHeifers450Kg: ["", [Validators.required]],
      growingFinishingCattleYear1: ["", [Validators.required]],
      growingFinishingCattleYear2: ["", [Validators.required]],      
      // Annual energy supply
      grazingLaxControl: ["", [Validators.required]],
      grazing: ["", [Validators.required]],
      roughGrazing: ["", [Validators.required]],
      twoCutSilage: ["", [Validators.required]],
      firstCutSilage: ["", [Validators.required]],      
      wholecropSilage: ["", [Validators.required]],
      otherConservedSilage: ["", [Validators.required]],
      // Bought-in feeds      
      straw: ["", ],
      rapeseedMeal: ["", [Validators.required]],
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

  // Liveweight MILK COWS (kg) ME allowance (MJ/day)
  //                       450                50
  //                       550                70
  //                       650                80
  // Daily energy required for milk production is 5.3MJ ME/litre
  //milk.

  calc_ME_CP_forMilkCows(personalId) {
    // 5.3 ME for 1L of milk

    if (personalId.weight > 450 && personalId.weight < 449) {
      this.ME = 50 * 365 + 5.3 * this.milkLitersYear;
      this.CP = 450;
    }
    if (personalId.weight > 550 && personalId.weight < 649) {
      this.ME = 70 * 365 + 5.3 * this.milkLitersYear;
      this.CP = 550;
    }
    if (personalId.weight > 650 && personalId.weight < 700) {
      this.ME = 80 * 365 + 5.3 * this.milkLitersYear;
      this.CP = 650;
    }
  }

  calc_ME_CP_forBeefCows(personalId) {
    if (personalId.weight > 420 && personalId.weight < 480) {
      this.ME = 26500;
      this.CP = 215;
    }
    if (personalId.weight > 481 && personalId.weight < 530) {
      this.ME = 29500;
      this.CP = 245;
    }
    if (personalId.weight > 531 && personalId.weight < 580) {
      this.ME = 31500;
      this.CP = 255;
    }
    if (personalId.weight > 581 && personalId.weight < 650) {
      this.ME = 37000;
      this.CP = 305;
    }
  }

  calc_ME_CP_ewesSingleLamb(personalId) {
    if (personalId.weight > 38 && personalId.weight < 44) {
      this.ME = 3540;
      this.CP = 30;
    }
    if (personalId.weight >= 45 && personalId.weight < 64) {
      this.ME = 4600;
      this.CP = 41;
    }
    if (personalId.weight >= 65 && personalId.weight < 84) {
      this.ME = 6100;
      this.CP = 52;
    }
    if (personalId.weight >= 85 && personalId.weight < 102) {
      this.ME = 7650;
      this.CP = 65;
    }
  }

  calc_ME_CP_ewesTwinLambs(personalId) {
    if (personalId.weight > 38 && personalId.weight < 44) {
      this.ME = 4350;
      this.CP = 39;
    }
    if (personalId.weight >= 45 && personalId.weight < 64) {
      this.ME = 5100;
      this.CP = 39;
    }
    if (personalId.weight >= 65 && personalId.weight < 84) {
      this.ME = 6650;
      this.CP = 60;
    }
    if (personalId.weight >= 85 && personalId.weight < 102) {
      this.ME = 8300;
      this.CP = 75;
    }
  }

  // lambs growing 150g/day
  calcForNutrientsLambs(personalId) {
    if (personalId.weight > 8 && personalId.weight < 12) {
      this.ME = 4350;
      this.CP = 39;
    }
    if (personalId.weight >= 13 && personalId.weight < 17) {
      this.ME = 5100;
      this.CP = 39;
    }
    if (personalId.weight >= 18 && personalId.weight < 23) {
      this.ME = 6650;
      this.CP = 60;
    }
    if (personalId.weight >= 24 && personalId.weight < 28) {
      this.ME = 8300;
      this.CP = 75;
    }
    if (personalId.weight >= 29 && personalId.weight < 37) {
      this.ME = 6650;
      this.CP = 60;
    }
    if (personalId.weight >= 38 && personalId.weight <= 45) {
      this.ME = 8300;
      this.CP = 75;
    }
  }

  calcNutriNeedsCowEarlyLactation(personalId, nutritionSource) {
    //      Energy density MJ/kg DM 12–13
    //      Crude Protein % DM 17–18
    //      Sugars + Starch % 20–25
    //      NDF % 32–34
  }

  add() {
    this.submitted = false;
    this.validationform.reset();
    this.item = new FeedPlanningCls();

    this.displayDialog1 = true;
  }

  edit() {
    if (!this.validSelection(this.selectedItems)) return;

    this.submitted = false;
    this.item = JSON.parse(
      JSON.stringify(this.selectedItems)
    ) as FeedPlanningCls;
    this.validationform.patchValue(this.item);
    // this.checkedNonStock();
    this.displayDialog1 = true;
  }

  onRowDblClick(event, data) {
    this.selectedItems = data;
    // this.checkedNonStock();
    console.log(this.form.nonstock.value);
    // console.log(this.checkedNonStock());
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
  // toggleBtn1() {
  //   this.toggle1 = true;
  //   this.toggle2 = false;
  //   this.toggle3 = false;
  // }
  // toggleBtn2() {
  //   this.toggle2 = true;
  //   this.toggle1 = false;
  //   this.toggle3 = false;
  // }
  // toggleBtn3() {
  //   this.toggle3 = true;
  //   this.toggle1 = false;
  //   this.toggle2 = false;
  // }
}
