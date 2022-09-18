

import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

// import { simplePieChart } from './data';

import { Opportunity, ChartType } from './opportunities.model';
// import { ChartComponent } from 'ng-apexcharts';
import { BaseService } from '../../_services/base.service';



@Component({
  selector: 'app-opportunities',
  templateUrl: './opportunities.component.html',
  styleUrls: ['./opportunities.component.scss']
})

/**
 * Opportunities component - handling the opportunities with sidebar and content
 */
export class OpportunitiesComponent implements OnInit {
  
  // @ViewChild('chartObj', { static: false }) chart: ChartComponent;
  // bread crumb items
  breadCrumbItems: Array<{}>;
  item: object;


  simplePieChart: ChartType;
  term: any;
  submitted: boolean;

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
  paginatedContactData: Array<Opportunity>;
  opportunityData: Array<Opportunity> = [];


  Status: Array<string> = ['Importanta', 'Ne Importanta', 'In progres', 'Pierduta', 'Castigata'];



  constructor(private modalService: NgbModal, public formBuilder: FormBuilder, private service: BaseService) {
    this.service.entity = 'opportunities';
  }

  ngOnInit() {
    // tslint:disable-next-line: max-line-length
    this.breadCrumbItems = [{ label: 'UBold', path: '/' }, { label: 'CRM', path: '/' }, { label: 'Opportunities', path: '/', active: true }];

    /**
     * form validation
     */
    this.validationform = this.formBuilder.group({
      id: [''],
      company: ['', [Validators.required]],
      name: ['', [Validators.required]],
      location: ['', [Validators.required]],
      category: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      phone: ['', [Validators.required, Validators.pattern('[+-]?([0-9]*[.])?[0-9]+')]],
      status: ['', [Validators.required]],
    });
    /**
     * fetches data
     */


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
    const company = this.validationform.get('company').value;
    const name = this.validationform.get('name').value;
    const location = this.validationform.get('location').value;
    const category = this.validationform.get('category').value;
    const email = this.validationform.get('email').value;
    const phone = this.validationform.get('phone').value;
    const status = this.validationform.get('status').value;

    this.item = {
      id,
      company,
      name,
      location,
      category,
      email,
      phone,
      status
    };

    if (this.validationform.valid) {

      this.opportunityData.push({
        id,
        company,
        name,
        location,
        category,
        email,
        phone,
        status
      });
      this.validationform = this.formBuilder.group({
        id: '',
        company: '',
        name: '',
        location: '',
        category: '',
        email: '',
        phone: '',
        status: ''
      });
      this.modalService.dismissAll();
    }
    this.submitted = true;
    this.totalSize = this.opportunityData.length + 1;
    this.paginatedContactData = this.opportunityData.slice(this.startIndex, this.endIndex);
    console.log('this is the opportunity list: ' + JSON.stringify(this.item));
    this.service._createItemEntity('opportunities', this.item).subscribe((data: any) => {
      (data => console.log('Done posting2: ' + data));
    });
    this.loadData();
  }

  /**
 * Pagination onpage change
 * @param page show the page
 */
  onPageChange(page: any): void {
    this.startIndex = (page - 1) * this.pageSize;
    this.endIndex = (page - 1) * this.pageSize + this.pageSize;
    this.paginatedContactData = this.opportunityData.slice(this.startIndex, this.endIndex);
  }
  /**
   * fetches the opportunities value
   */

  private loadData() {

    this.service.findAllItems().subscribe((data) => {
      this.opportunityData = data;
      console.log(this.opportunityData);
      // Pie chart
      const preliminary = [];
      const statCastig = [];
      const statImportant = [];
      const statNeImportant = [];
      const statInProgres = [];
      const statPierdut = [];

      this.opportunityData.forEach(function (el) {
        if (el) {
          preliminary.push(el.status);
        }
        console.log(preliminary);
        return preliminary;

      });

      preliminary.forEach(function (el) {
        if (el === 'Pierduta') { statPierdut.push(el); return statPierdut; } else if (!el) { statPierdut.length = 0 }
        else if (el === 'In progres') { statInProgres.push(el); return statInProgres; } else if (!el) { return statInProgres.length = 0 }
        else if (el === 'Ne Importanta') { statNeImportant.push(el); return statNeImportant; } else if (!el) { return statNeImportant.length = 0 }
        else if (el === 'Importanta') { statImportant.push(el); return statImportant; } else if (!el) { return statImportant.length = 0 }
        else { statCastig.push(el); return statCastig }

      });
      const simplePieChart: ChartType = {
        chart: {
          height: 270,
          type: 'pie',
        },
        series: [(statCastig.length / this.opportunityData.length) * 100, (statImportant.length / this.opportunityData.length) * 100,
        (statNeImportant.length / this.opportunityData.length) * 100, (statInProgres.length / this.opportunityData.length) * 100,
        (statPierdut.length / this.opportunityData.length) * 100],
        labels: ['Castigata', 'Importanta', 'Ne Importanta', 'In progres', 'Pierduta'],
        colors: ['#4fc6e1', '#6658dd', '#f7b84b', '#f1556c', '#1abc9c'],
        legend: {
          show: false
        },
        dataLabels: {
          enabled: false
        },
        responsive: [{
          breakpoint: 600,
          options: {
            chart: {
              height: 240
            },
            legend: {
              show: false
            },
          }
        }]
      };

      this.startIndex = 0;
      this.endIndex = this.pageSize;
      this.paginatedContactData = this.opportunityData.slice(this.startIndex, this.endIndex);
      this.totalSize = this.opportunityData.length;
      this.simplePieChart = simplePieChart;
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
      this.opportunityData.splice(id, 1);
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




  // class end
}
