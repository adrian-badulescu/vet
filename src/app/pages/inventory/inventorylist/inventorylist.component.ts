import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';

import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { of, Observable } from 'rxjs';

import { InventoryList } from './inventorylist.model';

import { contactData } from './data';
import { BaseService } from './../../_services/base.service';


@Component({
  selector: 'app-inventorylist',
  templateUrl: './inventorylist.component.html',
  styleUrls: ['./inventorylist.component.scss'],
})

/**
 * InventoryList component - handling the inventorylist with sidebar and content
 */
export class InventoryListComponent implements OnInit {
  // bread crumb items
  breadCrumbItems: Array<{}>;
  item: object;
  _item: object;
  submitted: boolean;
  term: any;
  _id: string;

  // page number
  page = 1;
  // default page size
  pageSize = 10;

  // start and end index
  startIndex = 1;
  endIndex = 10;
  totalSize = 0;

  paginatedContactData: Array<InventoryList>;
  inventorylist: Array<InventoryList>;
  // validation form
  validationform: FormGroup;

  constructor(private modalService: NgbModal, public formBuilder: FormBuilder, private service: BaseService, private router: Router, private route: ActivatedRoute) {

        //for server entity param
        this.service.entity = "inv_inventory";

  }
  ngOnInit() {
    // this.getItem(this.route.snapshot.params['id']);
    // tslint:disable-next-line: max-line-length
    this.breadCrumbItems = [{ label: 'Dashboard', path: '/' }, { label: 'Stocuri', path: '/' }, { label: 'Lista gestiuni', path: '/', active: true }];
    this.validationform = this.formBuilder.group({
      id: [''],
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      warehouseid: ['', [Validators.required]],
      typeid: ['', [Validators.required]],
      activ: ['', [Validators.required, Validators.pattern('[+-]?([0-9]*[.])?[0-9]+')]],
      is_virtual: ['', [Validators.required, Validators.pattern('[+-]?([0-9]*[.])?[0-9]+')]],
      consumption: ['', [Validators.required, Validators.pattern('[+-]?([0-9]*[.])?[0-9]+')]],
      delivery: ['', [Validators.required, Validators.pattern('[+-]?([0-9]*[.])?[0-9]+')]],
      receipt: ['', [Validators.required, Validators.pattern('[+-]?([0-9]*[.])?[0-9]+')]],
      adjustment: ['', [Validators.required, Validators.pattern('[+-]?([0-9]*[.])?[0-9]+')]],
      reservation: ['', [Validators.required, Validators.pattern('[+-]?([0-9]*[.])?[0-9]+')]],
      ownerid: ['', [Validators.required]],
      // email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],

    });

    /**
     * Fetches Data
     */
    this._fetchData();
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
   * save the inventorylist data
   */
  saveData() {
    const id = this.validationform.get('id').value;
    const name = this.validationform.get('name').value;
    const description = this.validationform.get('description').value;
    const warehouseid = this.validationform.get('warehouseid').value;
    const typeid = this.validationform.get('typeid').value;
    const activ = this.validationform.get('activ').value;
    const is_virtual = this.validationform.get('is_virtual').value;
    const consumption = this.validationform.get('consumption').value;
    const delivery = this.validationform.get('delivery').value;
    const receipt = this.validationform.get('receipt').value;
    const adjustment = this.validationform.get('adjustment').value;
    const reservation = this.validationform.get('reservation').value;
    const ownerid = this.validationform.get('ownerid').value;
    // const created_at = '';



    this.item = {
      id,
      name,
      description,
      warehouseid,
      typeid,
      activ,
      is_virtual,
      consumption,
      delivery,
      receipt,
      adjustment,
      reservation,
      ownerid

    };

    // const currentDate = new Date();
    if (this.validationform.valid) {

      this.inventorylist.push({
        // image: 'assets/images/users/user-1.jpg',
        id,
        name,
        description,
        warehouseid,
        typeid,
        activ,
        is_virtual,
        consumption,
        delivery,
        receipt,
        adjustment,
        reservation,
        ownerid,
        // created_at
        // date: currentDate.getDate() + '/' + currentDate.getMonth() + '/' + currentDate.getFullYear()
      });
      this.validationform = this.formBuilder.group({
        id: '',
        name: '',
        description: '',
        warehouseid: '',
        typeid: '',
        activ: [],
        is_virtual: '',
        consumption: '',
        delivery: '',
        receipt: '',
        adjustment: '',
        reservation: '',
        ownerid: '',
      });
      this.modalService.dismissAll();
    }
    this.submitted = true;
    this.totalSize = this.inventorylist.length + 1;
    this.paginatedContactData = this.inventorylist.slice(this.startIndex, this.endIndex);
    console.log('this is the inventory list: ' + JSON.stringify(this.item));
    this.service._createItem(this.item).subscribe((data: any) => {
      (data => console.log('Done posting: ' + data));
    });
  }

  /**
   * Pagination onpage change
   * @param page show the page
   */
  onPageChange(page: any): void {
    this.startIndex = (page - 1) * this.pageSize;
    this.endIndex = (page - 1) * this.pageSize + this.pageSize;
    this.paginatedContactData = this.inventorylist.slice(this.startIndex, this.endIndex);
  }

  private _fetchData() {

    // this.inventorylist = contactData; // of(contactData) <- from backend
    // apply pagination
    this.service.findAllItems().subscribe((data) => {
      console.log(data);
      this.inventorylist = data;
      this.startIndex = 0;
      this.endIndex = this.pageSize;
      this.paginatedContactData = this.inventorylist.slice(this.startIndex, this.endIndex);
      this.totalSize = this.inventorylist.length;
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
      this.inventorylist.splice(id, 1);
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



  closeModal(form, modal) {
    form.reset();
    modal('close');
  }

}
