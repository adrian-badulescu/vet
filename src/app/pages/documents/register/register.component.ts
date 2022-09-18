import { map } from 'rxjs/operators';
import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';

import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DecimalPipe, CommonModule } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


import { RegisterList } from './register.model';
import { NgxSmartModalService } from 'ngx-smart-modal';


// import { BaseService } from '../../_services/base.service';
import { ModuleService } from '../../_services/module.service';
import { ModuleSortableDirective, SortEvent } from '../../_ewo/base/module-sortable.directive';
import { TransformVisitor } from '@angular/compiler/src/render3/r3_ast';
import { isNullOrUndefined } from 'util';

export enum Transmis {
  DA = 1,
  NU = 0
}
export enum ValidareManager {
  DA = 1,
  NU = 0
}

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [ModuleService, DecimalPipe]
})

/**
 * RegisterList component - handling the RegisterList with sidebar and content
 */
export class RegisterComponent implements OnInit {
  // bread crumb items
  breadCrumbItems: Array<{}>;
  item: object;
  _item: object;
  submitted: boolean;
  term: any;
  _id: string;
  total$ = 100;
  Event: Array<string> = ['Intrare', 'Iesire'];
  Type_doc: Array<string> = ['Email', 'MMS', 'Fax'];
  Partner1id: Array<string> = ['Panascanic', 'Microsopht', 'Addibas'];
  Department1id: Array<string> = ['IT', 'Contabilitate', 'Securitate'];
  IT: Array<string> = ['Doru Compostoru', 'Ionut Bucseaz'];
  Contabilitate: Array<string> = ['Mariusz', 'Laurentiu Macanescu'];
  Securitate: Array<string> = ['Lolo', 'Vali', 'Goni'];

  Personal1id: any;

  // page number
  page = 1;
  // default page size
  pageSize = 10;

  // start and end index
  startIndex = 1;
  endIndex = 10;
  totalSize = 0;

  paginatedContactData: Array<RegisterList>;
  register: Array<any>;
  // validation form
  validationform: FormGroup;
  Transmis: typeof Transmis = Transmis;
  ValidareManager: typeof ValidareManager = ValidareManager;
  transmis: number = 0;
  vvv: number;
  check: boolean = false;



  constructor(public modalService: NgbModal, public formBuilder: FormBuilder, public service: ModuleService, private router: Router, private route: ActivatedRoute) {

    //for server entity param
    this.service.entity = "register";


  }


  ngOnInit() {
    // this.getItem(this.route.snapshot.params['id']);
    // tslint:disable-next-line: max-line-length
    this.breadCrumbItems = [{ label: 'Dashboard', path: '/' }, { label: 'Stocuri', path: '/' }, { label: 'Lista gestiuni', path: '/', active: true }];
    this.validationform = this.formBuilder.group({
      id: [''],
      number: [''],
      serie: [''],
      date: [''],
      event: [''],
      number_doc: [''],
      date_doc: [''],
      type_doc: [''],
      partner1id: [''],
      department1id: [''],
      personal1id: [''],
      msg1: [''],
      partner2id: [''],
      department2id: [''],
      personal2id: [''],
      msg2: [''],
      msg: [''],
      vvv: [''],
      transmis: [''],
      userid: ['']
      // id: [''],
      // name: ['', [Validators.required]],
      // description: ['', [Validators.required]],
      // warehouseid: ['', [Validators.required]],
      // typeid: ['', [Validators.required]],
      // activ: ['', [Validators.required, Validators.pattern('[+-]?([0-9]*[.])?[0-9]+')]],
      // is_virtual: ['', [Validators.required, Validators.pattern('[+-]?([0-9]*[.])?[0-9]+')]],
      // consumption: ['', [Validators.required, Validators.pattern('[+-]?([0-9]*[.])?[0-9]+')]],
      // delivery: ['', [Validators.required, Validators.pattern('[+-]?([0-9]*[.])?[0-9]+')]],
      // receipt: ['', [Validators.required, Validators.pattern('[+-]?([0-9]*[.])?[0-9]+')]],
      // adjustment: ['', [Validators.required, Validators.pattern('[+-]?([0-9]*[.])?[0-9]+')]],
      // reservation: ['', [Validators.required, Validators.pattern('[+-]?([0-9]*[.])?[0-9]+')]],
      // ownerid: ['', [Validators.required]],
      // email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],

    });

    /**
     * Fetches Data
     */
    this._fetchData();


  }

  handleTransmis($event) {
    if ($event.target.checked) {
      this.form.transmis.patchValue(Transmis.DA);
    } else if (this.form.transmis.value === undefined || null ) { this.form.transmis.patchValue(Transmis.NU); }
    else if (this.form.transmis.value === Transmis.DA && $event.target.checked === false) 
    { this.form.transmis.patchValue(Transmis.NU) }

    console.log('$event.target.checked :' + $event.target.checked);
    console.log('$event.target.value :' + $event.target.value);
    console.log('this.form.transmis.value :' + this.form.transmis.value);
    console.log('check :' + this.check);
  }
  handleValidatManager($event) {
    if ($event.target.checked) {
      this.form.vvv.patchValue(ValidareManager.DA);
    } else if (this.form.vvv.value === undefined || null ) { this.form.vvv.patchValue(ValidareManager.NU); }
    else if (this.form.vvv.value === ValidareManager.DA && $event.target.checked === false) 
    { this.form.vvv.patchValue(ValidareManager.NU); }
    // console.log('vvv: ' + this.vvv);
  }


  checkedTransmis(): boolean {
    if (this.form.transmis.value === Transmis.DA) {
      return true;
    } else if (this.form.transmis.value === undefined) {
      return false;
    } else if (this.form.transmis.value === null) {
      return false;
    } else if (this.form.transmis.value === Transmis.NU) {
      return false;
    }
  }


  checkedValidatManager(): boolean {
    if (this.form.vvv.value === ValidareManager.DA) {
      return true;
    } else if (this.form.vvv.value === undefined) {
      return false;
    } else if (this.form.vvv.value === null) {
      return false;
    } else if (this.form.vvv.value === ValidareManager.NU) {
      return false;
    }
  }


  selectDept(el) {
    if (el === '1: IT') {
      this.Personal1id = this.IT;
    } else if (el === '2: Contabilitate') {
      this.Personal1id = this.Contabilitate;
    } else { this.Personal1id = this.Securitate; }
  }

  /**
   * Returns form
   */
  get form() {
    return this.validationform.controls;
  }
  /**
   * Modal Open
   * @param content modal content
   */
  openModal(content: string) {
    this.modalService.open(content, { centered: true, size: 'lg' });
  }

  /**
   * save the RegisterList data
   */
  saveData() {
    const id = this.service.guid();
    const number = this.validationform.get('number').value;
    const serie = this.validationform.get('serie').value;
    const date = new Date();
    const event = this.validationform.get('event').value;
    const number_doc = this.validationform.get('number_doc').value;
    const date_doc = this.validationform.get('date_doc').value;
    const type_doc = this.validationform.get('type_doc').value;
    const partner1id = this.validationform.get('partner1id').value;
    const department1id = this.validationform.get('department1id').value;
    const personal1id = this.validationform.get('personal1id').value;
    const msg1 = this.validationform.get('msg1').value;
    const partner2id = this.validationform.get('partner2id').value;
    const department2id = this.validationform.get('department2id').value;
    const personal2id = this.validationform.get('personal2id').value;
    const msg2 = this.validationform.get('msg2').value;
    const msg = this.validationform.get('msg').value;
    const vvv = this.validationform.get('vvv').value;
    const transmis = this.validationform.get('transmis').value;
    const userid = this.validationform.get('userid').value;



    this.item = {
      id,
      number,
      serie,
      date,
      event,
      number_doc,
      date_doc,
      type_doc,
      partner1id,
      department1id,
      personal1id,
      msg1,
      partner2id,
      department2id,
      personal2id,
      msg2,
      msg,
      vvv,
      transmis,
      userid
    };

    // const currentDate = new Date();
    if (this.validationform) {

      this.register.push({
        id,
        number,
        serie,
        date,
        event,
        number_doc,
        date_doc,
        type_doc,
        partner1id,
        department1id,
        personal1id,
        msg1,
        partner2id,
        department2id,
        personal2id,
        msg2,
        msg,
        vvv,
        transmis,
        userid
        // created_at
        // date: currentDate.getDate() + '/' + currentDate.getMonth() + '/' + currentDate.getFullYear()
      });
      this.submitted = true;
      this.totalSize = this.register.length + 1;
      this.paginatedContactData = this.register.slice(this.startIndex, this.endIndex);
      console.log('this is the REGISTER list: ' + JSON.stringify(this.item));
      this.service._createItem(this.item).subscribe((data: any) => {
        // (data => console.log('Done posting: ' + data));
      });
      this.modalService.dismissAll();
    }
    console.log(this.register);
  }

  /**
   * Pagination onpage change
   * @param page show the page
   */
  onPageChange(page: any): void {
    this.startIndex = (page - 1) * this.pageSize;
    this.endIndex = (page - 1) * this.pageSize + this.pageSize;
    this.paginatedContactData = this.register.slice(this.startIndex, this.endIndex);
  }

  private _fetchData() {
    this.service.findAllItems().subscribe((data) => {
      this.register = this.service.tableData;
      this.startIndex = 0;
      this.endIndex = this.pageSize;
      this.paginatedContactData = this.register.slice(this.startIndex, this.endIndex);
      this.totalSize = this.register.length;
      console.log(this.register);
    });

  }


  getItem(id) {
    this.service.getItem(id).subscribe(data => {
      this.item = data;
      this._id = data.id;
      this.validationform.patchValue(this.item);
      console.log('from getItem():  ' + JSON.stringify(this.item));
    });
  }

  openToEditModal(content, values) {
    this.validationform.patchValue(values);
    this.openModal(content);
  }

  updateItem(id, item) {
    delete item['id'];
    this.service.updateItem(id, item).subscribe(
      data => {
        this.getItem(id);
        this._fetchData();
        item = data;
      });
  }


  deleteItem(id) {
    this.service.deleteItem(id).subscribe(res => {
      this.register.splice(id, 1);
      this._fetchData();
    });
  }


  onSubmit(values: object, form, modal) {
    if (values['id']) {
      //update
      this.updateItem(values['id'], values);
      this.closeModal(form, modal);
    } else {
      //post
      this.saveData();
    }

  }

  closePrintInventory() {
    return;
  }

  onSort() {
    return;
  }

  closeModal(form, modal) {
    form.reset();
    modal('close');
  }

}
