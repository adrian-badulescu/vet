import { Component, OnInit, ViewChild, Input, AfterViewInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ProjectsData } from './projects.model';
import { ProjectsService } from './projects.service';

// import { projectData } from './data';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})

/**
 * Projects component - handling the projects with sidebar and content
 */
export class ProjectsComponent implements OnInit {
  // @Input() ProjectsData;

  // @ViewChild('_ongoing') ongoingTemplate; 
  item: object;
  _id: string;
  data: ProjectsData;
  status: ProjectsData['status'];

  ongoing: Array<ProjectsData>;
  finished: Array<ProjectsData>;

  validationform: FormGroup;
  Status: Array<string> = ['Incheiat', 'In derulare'];
  // bread crumb items
  breadCrumbItems: Array<{}>;
  startIndex = 1;
  endIndex = 10;
  totalSize = 0;
  paginatedContactData: Array<ProjectsData>;

  projectData: ProjectsData[] = [];
  constructor(private modalService: NgbModal, public formBuilder: FormBuilder, public service: ProjectsService) { this._fetchData(); }

  ngOnInit() {
    // tslint:disable-next-line: max-line-length
    this.breadCrumbItems = [{ label: 'UBold', path: '/' }, { label: 'Apps', path: '/' }, { label: 'Projects', path: '/', active: true }];
    this.validationform = this.formBuilder.group({
      id: [''],
      name: ['', [Validators.required]],
      status: ['', [Validators.required]],
      created_date: ['', [Validators.required]],
      due_date: ['', [Validators.required]],
      // reservation: ['', [Validators.required, Validators.pattern('[+-]?([0-9]*[.])?[0-9]+')]],
      // email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
    });
    /**
     * fetches data
     */
    this._fetchData();

  }

  // ngAfterViewInit() {
  //   console.log(this.helloTemplate);
  // }


  get form() {
    return this.validationform.controls;
  }


  //  }
  getOngoing() {
    // this.projectData = this.projectData.filter(data => data.status === 'In derulare');
    this.service.findAllProjects().subscribe((data) => {
      this.projectData = data.filter(dat => dat.status === 'In derulare');
    });
  }

  getFinished() {
    this.service.findAllProjects().subscribe((data) => {
      this.projectData = data.filter(dat => dat.status === 'Incheiat');
    });
  }

  getAll() {
    this._fetchData();
  }
  /**
   * fetches project value
   */
  private _fetchData() {
    this.service.findAllProjects().subscribe((data) => {
      this.projectData = data;
    });

  }

  openModal(content: string) {
    this.modalService.open(content, { centered: true, size: 'xl' });
  }

  saveData() {
    const id = this.validationform.get('id').value;
    const name = this.validationform.get('name').value;
    const status = this.validationform.get('status').value;
    const created_date = this.validationform.get('created_date').value;
    const due_date = this.validationform.get('due_date').value;


    this.item = {
      id,
      name,
      status,
      created_date,
      due_date
    };

    // const currentDate = new Date();
    if (this.validationform.valid) {

      this.projectData.push({
        // image: 'assets/images/users/user-1.jpg',
        id,
        name,
        status,
        created_date,
        due_date

        // created_at
        // date: currentDate.getDate() + '/' + currentDate.getMonth() + '/' + currentDate.getFullYear()
      });
      this.validationform = this.formBuilder.group({
        id: '',
        name: '',
        status: '',
        created_date: '',
        due_date: ''

      });
      this.modalService.dismissAll();
    }
    this.totalSize = this.projectData.length + 1;
    this.service._createProject(this.item).subscribe((data: any) => {
      (data => console.log('Done posting: ' + data));
    });
    console.log(this.item);
  }

  getProject(id) {
    this.service.getProject(id).subscribe(data => {
      this.item = data;
      this._id = data.id;
      this.validationform.patchValue(this.item);
      console.log('from getItem():  ' + JSON.stringify(this.item));
    });
  }

  updateProject(id, item) {
    delete item['id'];
    this.service.updateProject(id, item).subscribe(
      data => {
        this.getProject(id);
        this._fetchData();
        item = data;
      });
  }

  deleteProject(id) {
    this.service.deleteProject(id).subscribe(res => {
      this.projectData.splice(id, 1);
      this._fetchData();
    });
  }

  onSubmit(values: object, form, modal) {
    if (values['id']) {
      //update
      this.updateProject(values['id'], values);
      this.closeModal(form, modal);
    } else {
      //post
      this.saveData();
    }

  }
  openToEditModal(content, values) {
    console.log(values);
    this.validationform.patchValue(values);
    this.openModal(content);
  }

  closeModal(form, modal) {
    form.reset();
    modal('close');
  }
}
