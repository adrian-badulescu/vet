import {
  Component,
  OnInit,
  Input,
  Directive,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from "@angular/core";
import { user_tracker, dataCls } from "./user-tracker.model";
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
  selector: "app-user-tracker",
  templateUrl: "./user-tracker.component.html",
  styleUrls: ["./user-tracker.component.scss"],
})
export class UserTrackerComponent implements OnInit {
  @ViewChild("dt", { static: true }) dt: ElementRef;

  results: Array<user_tracker> = [];
  page_total: number = 10; // nr de pg
  totalRows: number = null;
  pageNumber: number = 1; //Math.ceil(this.totalRows / this.page_total);
  pages: Array<number>;
  limit: number;
  offset: number;
  pageSize: number;
  logs: string;
  indexArray: Array<number>;

  constructor(private service: BaseService, private route: ActivatedRoute) {
    this.logs = "logs";
    this.limit = 10;
    this.offset = 0;
  }
  

  

  loadPage(table: string, limit: number, offset: number) {
    console.log(limit, offset);
    this.service
      .getPage(table, limit, offset)
      .pipe(
        map(
          (data) => (
            console.log("here: " + JSON.stringify(data)),
            (this.results = data.results),
            (this.indexArray = data.indexArray),
            (this.totalRows = data.total)
            
                       
          )
        )
      )
      .subscribe(
        (res) => console.log(res),
        (msg) => this.alertOverSizedReq(msg)
      );
  }
  paginate(e) {
    console.log(e);
    this.limit = e.rows;
    this.offset = e.page;
    this.loadPage("logs", this.limit, this.offset);
  }

  alertOverSizedReq(msg: string) {
    if (isString(msg)) {
      return alert(msg);
    }
    return;
  }

  ngOnInit() {
    this.route.queryParams.subscribe((data) => {
      // this.limit = +data.limit || 10;
      // this.offset = ((+data.page || 1) - 1) * (+data.limit || 10);
      // this.loadPage("logs", this.limit, this.offset);
    });
    this.loadPage("logs", this.limit, this.offset);
  }
}
