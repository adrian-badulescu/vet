import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Leads, ChartType } from './leads.model';
import { BaseService } from '../../_services/base.service';

import { leadsData, leadsBarChart } from './data';

@Component({
  selector: 'app-leads',
  templateUrl: './leads.component.html',
  styleUrls: ['./leads.component.scss']
})

/**
 * Leads component - handling the leads with sidebar and content
 */
export class LeadsComponent implements OnInit {
  // bread crumb items
  breadCrumbItems: Array<{}>;
  term: any;
  leadsData: Leads[];
  leadsBarChart: ChartType;
  submitted: boolean;
  item: Leads;
  daten: any;
  // datePlaceHolder: string = this.item.date;
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
  paginatedContactData: Array<Leads>;


  constructor(private modalService: NgbModal, public formBuilder: FormBuilder, private service: BaseService) {

    //for server entity param
    this.service.entity = "leads";
  }

  ngOnInit() {
    // tslint:disable-next-line: max-line-length
    this.breadCrumbItems = [{ label: 'UBold', path: '/' }, { label: 'CRM', path: '/' }, { label: 'Leads', path: '/', active: true }];

    /**
     * fetches data
     */
    
    this.validationform = this.formBuilder.group({
      id: [''],
      name: ['', [Validators.required]],
      location: ['', [Validators.required]],
      category: ['', [Validators.required]],
      date: ['']
    });
    ;
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
   * save the Opportunities data
   */
  createItem() {
    const id = this.service.guid();
    const name = this.validationform.get('name').value;
    const category = this.validationform.get('category').value;
    const location = this.validationform.get('location').value;
    const date = this.validationform.get('date').value;

    this.item = {
      id,
      name,
      location,
      category,
      date
    };

    if (this.validationform.valid) {

      this.leadsData.push({
        id,
        // company: 'assets/images/companies/amazon.png',
        name,
        category,
        location,
        date,
        // date: (month).toString() + '/' + (day).toString() + '/' + (year).toString()
      });
      this.validationform = this.formBuilder.group({
        id: '',
        // company: '',
        name: '',
        location: '',
        category: '',
        date: ''


      });
      this.modalService.dismissAll();
    }
    this.totalSize = this.leadsData.length + 1;
    this.paginatedContactData = this.leadsData.slice(this.startIndex, this.endIndex);
    console.log('this is the inventory list: ' + JSON.stringify(this.item));
    this.service._createItemEntity('leads', this.item).subscribe((data: any) => {
      (data => console.log('Done posting2: ' + data));

    });
    this.submitted = true;
    console.log(date);
    this.loadData();
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

  // getObjDate() {
  //   this.validationform = 
  // }


  getItem(id) {
    this.service.getItem(id).subscribe(data => {
      this.item = data;
      // this._id = data.id;
      this.validationform.patchValue(this.item);
    });
  }

  deleteItem(id) {
    this.service.deleteItem(id).subscribe(res => {
      this.leadsData.splice(id, 1);
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

  /**
   * fetches the leads value
   */
  private loadData() {
    this.service.findAllItemsEntity('leads').subscribe(data => {
      this.leadsData = data;
    });
    // this.leadsData = leadsData;
    this.leadsBarChart = leadsBarChart;
  }
}
