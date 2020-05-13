import { Component, OnInit } from "@angular/core";
import { Base } from "../../_ewo/base";
import { EwoColumn, EwoProperty } from "../../_ewo/model/model";
import {
  SelectItem,
  LazyLoadEvent,
  FilterMetadata
} from "primeng/components/common/api";

import { BaseService as EwoService } from "../../_ewo/service/service";
import { PasunatCls } from "./pasunat.model";

import { BaseService } from "../../_services/base.service";

import { Validators, FormGroup, FormBuilder } from "@angular/forms";

@Component({
  selector: "app-pasunat",
  templateUrl: "./pasunat.component.html",
  styleUrls: ["./pasunat.component.scss"],
  providers: [EwoService, BaseService]
})
export class PasunatComponent extends Base implements OnInit {
  autoTicks = false;
  disabled = false;
  invert = false;
  max = 100;
  min = 0;
  showTicks = false;
  step = 1;
  thumbLabel = false;

  item: PasunatCls;

  yearValue = null;
  ianValue = null;
  febValue = null;
  marValue = null;
  aprValue = null;
  maiValue = null;
  iunValue = null;
  iulValue = null;
  augValue = null;
  sepValue = null;
  octValue = null;
  novValue = null;
  decValue = null;

  vertical = false;
  tickInterval = 1;

  pasunatArr: Array<number> = [];
  pasunatArrLen: number = null;

  constructor(
    private serviceBase1: EwoService,
    private service: BaseService,
    public formBuilder: FormBuilder
  ) {     super(serviceBase1);}
  getSliderTickInterval(): number | "auto" {
    return this.showTicks ? (this.autoTicks ? "auto" : this.tickInterval) : 0;
  }

  ngOnInit() {
    this.service.entity = this.entityapi = 'pasunat';
    this.item = new PasunatCls;
    this.service.findAllItems().subscribe((all) => {
      this.pasunatArr = all;
      this.pasunatArrLen = this.pasunatArr.length;     
    });

    
  }

  createItem() {
    this.item.id = this.service.guid();
    this.item.yearvalue = this.yearValue;
    this.item.ianValue =  this.ianValue;
    this.item.febValue = this.febValue;
    this.item.marValue = this.marValue;
    this.item.aprValue = this.aprValue;
    this.item.maiValue = this.maiValue;
    this.item.iunValue = this.iunValue;
    this.item.iulValue = this.iulValue;
    this.item.augValue = this.augValue;
    this.item.sepValue = this.sepValue;
    this.item.octValue = this.octValue;
    this.item.novValue = this.novValue;
    this.item.decValue = this.decValue;
    this.item.creationDate = new Date();

    this.service._createItem(this.item).subscribe((data: PasunatCls) => {
      this.item = data;
    })
    this.service.findAllItems().subscribe((all) => {
      this.pasunatArr = all;
      console.log(this.pasunatArr);

    });
  }
}
