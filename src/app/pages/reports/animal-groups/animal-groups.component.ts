import { Component, OnInit } from "@angular/core";
import { animalGrp_Cls } from "./animal-groups.model";
import { Base } from "../../_ewo/base";
import { SelectItem } from "primeng/components/common/api";

import { BaseService as EwoService } from "../../_ewo/service/service";

import { BaseService } from "../../_services/base.service";
import { TabsetComponent } from "ngx-bootstrap/tabs";
import { Validators, FormGroup, FormBuilder } from "@angular/forms";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { ActivatedRoute } from "@angular/router";
import { isString } from "util";

@Component({
  selector: "app-animal-groups",
  templateUrl: "./animal-groups.component.html",
  styleUrls: ["./animal-groups.component.scss"],
})
export class AnimalGroupsComponent implements OnInit {
  results: Array<animalGrp_Cls> = [];

  constructor(private service: BaseService) {}
  getView(view) {
    this.service.getAllViews(view).subscribe(data => this.results = data);
  }

  ngOnInit() {

    this.getView("animalgrps");
  }
}
