import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Customers } from './customers.model';

// import { customersData } from './data';
import { BaseService } from '../../_services/base.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})

/**
 * Customers component - handling the customer with sidebar and content
 */
export class CustomersComponent implements OnInit {
  // bread crumb items
  breadCrumbItems: Array<{}>;
  paginatedData: Array<Customers>;
  customersData: Customers[];
  submitted: boolean;
  item: object;

  // page number
  page = 1;
  // default page size
  pageSize = 10;

  // start and end index
  startIndex = 1;
  endIndex = 10;
  totalSize = 0;


  // validation form
  validationform: FormGroup;
  Status: Array<string> = ['Activ', 'Blocat'];

  constructor(private modalService: NgbModal, public formBuilder: FormBuilder, private service: BaseService) {
    this.service.entity = "customers";
   }

  ngOnInit() {
    // tslint:disable-next-line: max-line-length
    this.breadCrumbItems = [{ label: 'UBold', path: '/' }, { label: 'CRM', path: '/' }, { label: 'Customers', path: '/', active: true }];
    this.validationform = this.formBuilder.group({
      id: [''],
      customer: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      location: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      date: [''],
      status: ['']
    });

    this.loadData();
  }
 
  /**
   * Modal Open
   * @param content modal content
   */
  openModal(content: string) {
    this.modalService.open(content, { centered: true });
  }

  /**
   * save the contacts data
   */
  createItem() {
    const id = this.service.guid();
    const customer = this.validationform.get('customer').value;
    const phone = this.validationform.get('phone').value;
    const location = this.validationform.get('location').value;
    const email = this.validationform.get('email').value;
    const date = this.validationform.get('date').value;   
    const status = this.validationform.get('status').value;

    this.item = {
      id,
      customer,
      phone,
      location,
      email,
      date: new Date(),
      status
    };

    if (this.validationform.valid) {
      this.customersData.push({
        id,
        // image: 'assets/images/users/user-1.jpg',
        customer,
        phone,
        email,
        location,
        date,
        status
      });
      this.validationform = this.formBuilder.group({
        id: '',
        customer: '',
        phone: '',
        email: '',
        location: '',
        date: '',
        status: ''
      });
      this.modalService.dismissAll();
    }
    this.submitted = true;
    this.totalSize = this.customersData.length + 1;
    this.paginatedData = this.customersData.slice(this.startIndex, this.endIndex);
    this.service._createItemEntity('customers', this.item).subscribe((data: any) => {
      (data => console.log(this.customersData));
      console.log(this.item);
    });
    this.loadData();
  }

  /**
   * paginatio onchange event
   * @param page page
   */
  onPageChange(page: any): void {
    this.startIndex = (page - 1) * this.pageSize;
    this.endIndex = (page - 1) * this.pageSize + this.pageSize;
    this.paginatedData = this.customersData.slice(this.startIndex, this.endIndex);
  }
  /**
   * fetches the customer value
   */
  private loadData() {
    this.service.findAllItemsEntity('customers').subscribe(data => {
      this.customersData = data;
    });

  }


  updateItem(id, item) {
    delete item['id'];
    this.service.updateItem(id, item).subscribe(
      data => {
        this.getItem(id);
        this.loadData();
        item = data;
      });
  }


  getItem(id) {
    this.service.getItem(id).subscribe(data => {
      this.item = data;
      // this._id = data.id;
      this.validationform.patchValue(this.item);
    });
  }


  deleteItem(id) {
    this.service.deleteItem(id).subscribe(res => {
      this.customersData.splice(id, 1);
      this.loadData();
    });
  }


  onSubmit(values: object, form, modal) {

    if (values['id']) {
      this.updateItem(values['id'], values);
    } else {
      this.createItem();
    }
    this.closeModal(form, modal);
  }


  openToEditModal(content, values) {
    this.validationform.patchValue(values);
    this.openModal(content);
  }


  closeModal(form, modal) {
    form.reset();
    modal('close');

  }


}
