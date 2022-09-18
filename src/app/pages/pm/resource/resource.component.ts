import { TableData } from './../tickets/tickets.model';
import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';

import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { of, Observable } from 'rxjs';
import { DecimalPipe, CommonModule } from '@angular/common';
import { Resource } from './resource.model';

// import { contactData } from './data';
import { ModuleService } from '../../_services/module.service';


@Component({
  selector: 'app-resource',
  templateUrl: './resource.component.html',
  styleUrls: ['./resource.component.scss'],
  providers: [ModuleService, DecimalPipe]
})

/**
 * InventoryList component - handling the inventorylist with sidebar and content
 */
export class ResourceComponent implements OnInit {
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

  paginatedContactData: Array<any>;
  resource: any;
  // validation form
  validationform: FormGroup;

  Typeid: Array<string> = ['Tip 1', ' Tip 2', 'Tip 3'];
  Categoryid: Array<string> = ['Cat 1', 'Cat 2', 'Cat 3'];
  Entitytypeid: Array<string> = ['Ent tip 1', 'Ent tip 2', 'Ent tip 3'];

  constructor(private modalService: NgbModal, public formBuilder: FormBuilder, private service: ModuleService, private router: Router, private route: ActivatedRoute) {

        //for server entity param
        this.service.entity = "pm_resource";

  }
  ngOnInit() {
    // this.getItem(this.route.snapshot.params['id']);
    // tslint:disable-next-line: max-line-length
    this.breadCrumbItems = [{ label: 'Dashboard', path: '/' }, { label: 'Stocuri', path: '/' }, { label: 'Lista gestiuni', path: '/', active: true }];
    this.validationform = this.formBuilder.group({
      id: [''],
      name: [''],
      categoryid: [''],
      typeid: [''],
      description: [''],
      hourcost: [''],
      entitytypeid: ['']
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
    const id = this.service.guid();
    const name = this.validationform.get('name').value;
    const categoryid = this.validationform.get('categoryid').value;
    const typeid = this.validationform.get('typeid').value;
    const description = this.validationform.get('description').value;
    const hourcost = this.validationform.get('hourcost').value;
    const entitytypeid = this.validationform.get('entitytypeid').value;
    



    this.item = {
      id,
      name,
      categoryid,
      typeid,
      description,
      hourcost,
      entitytypeid
    };

    // const currentDate = new Date();
    if (this.validationform) {

      this.resource.push({
        // image: 'assets/images/users/user-1.jpg',
        id,
        name,
        categoryid,
        typeid,
        description,
        hourcost,
        entitytypeid

      });
      this.submitted = true;
      this.totalSize = this.resource.length + 1;
      this.paginatedContactData = this.resource.slice(this.startIndex, this.endIndex);
      console.log('this is the inventory list: ' + JSON.stringify(this.item));
      this.service._createItem(this.item).subscribe((data: any) => {
        (data => console.log('Done posting: ' + data));
      });
      this.modalService.dismissAll();
    }

  }

  /**
   * Pagination onpage change
   * @param page show the page
   */
  onPageChange(page: any): void {
    this.startIndex = (page - 1) * this.pageSize;
    this.endIndex = (page - 1) * this.pageSize + this.pageSize;
    this.paginatedContactData = this.resource.slice(this.startIndex, this.endIndex);
  }

  private _fetchData() {

    // this.resource = contactData; // of(contactData) <- from backend
    // apply pagination
    this.service.findAllItems().subscribe((data) => {
      this.resource = this.service.tableData;
      this.startIndex = 0;
      this.endIndex = this.pageSize;
      this.paginatedContactData = this.resource.slice(this.startIndex, this.endIndex);
      this.totalSize = this.resource.length;
      console.log(data);
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
      this.resource.splice(id, 1);
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
