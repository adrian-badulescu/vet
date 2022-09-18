import { Component, OnInit, ViewChild } from '@angular/core';

import { FormGroup, FormBuilder, Validators, } from '@angular/forms';

import { DndDropEvent } from 'ngx-drag-drop';
import { BoardI } from './board.model';
import { BaseService } from './../_services/base.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})

/**
 * KanbanBoard component - handling the kanbanboard with sidebar and content
 */
export class BoardComponent implements OnInit {
  @ViewChild('calendar', { static: false }) BoardComponent: BoardComponent;
  // bread crumb items
  item: BoardI;
  selectedItems: BoardI[];
  breadCrumbItems: Array<{}>;
  tasks: Array<BoardI>;
  // Task data
  taskList: Array<BoardI> = [];
  pendingTasks: BoardI[];
  inprogressTasks: BoardI[];
  completedTasks: BoardI[];
  _form: FormGroup;
  // form2: FormGroup;
  // form3: FormGroup;
  constructor(private modalService: NgbModal, private service: BaseService, public formBuilder: FormBuilder) { this.service.entity = "board"; }

  ngOnInit() {
    // tslint:disable-next-line: max-line-length
    this.breadCrumbItems = [{ label: 'UBold', path: '/' }, { label: 'Apps', path: '/' }, { label: 'Kanban Board', path: '/', active: true }];
    this._form = this.formBuilder.group({
      id: [''],
      title: ['', Validators.required],
      description: ['', Validators.required],
      date: ['', Validators.required],
      task: ['', Validators.required],
      user: ['', Validators.required],
      status: ['']
    });

    /**
     * Fetches Data
     */
    this._fetchData();

  }
  get form() {
    return this._form.controls;
  }


  /**
   * On task drop event
   */
  onDrop(event: DndDropEvent, filteredList?: any[], targetStatus?: string) {
    if (filteredList && event.dropEffect === 'move') {
      let index = event.index;

      if (typeof index === 'undefined') {
        index = filteredList.length;
      }

      filteredList.splice(index, 0, event.data);
      console.log(event.data);
      console.log(event.index);
      console.log(targetStatus);
      console.log(filteredList);
      this.item = event.data;
      this.item.status = targetStatus;
      console.log(this.item.status);
      this.updateItem(event.data.id, event.data);

    }

  }

  getStatus() {
    console.log(this.item.status);
  }
  validSelection(selected: any[]): boolean {
    if (!selected || selected.length == 0) {
      alert('Select item!');
      return false;
    }

    return true;
  }
  /**
   * on dragging task
   * @param item item dragged
   * @param list list from item dragged
   */
  onDragged(item: any, list: any[]) {
    const index = list.indexOf(item);
    list.splice(index, 1);
  }

  openModal1(content1: any) {
    // this.newEventDate = event.date;
    this.modalService.open(content1, { centered: true, size: 'lg' });
  }



  createItem() {
    this.item = {
      id: this.service.guid(),
      title: this._form.get('title').value,
      description: this._form.get('title').value,
      date: this._form.get('date').value,
      task: this._form.get('task').value,
      user: this._form.get('user').value,
      status: 'pending',
    };
    this.service._createItem(this.item).subscribe(data => {

    });
  }





  getItem(id) {
    this.service.getItem(id).subscribe(data => {
      this.item = data;
      // this._id = data.id;
      this._form.patchValue(this.item);
    });
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
    console.log(id);
    this.service.deleteItem(id).subscribe(res => {
      this.taskList.splice(id, 1);
      this._fetchData();
    });
  }

  /**
   * Fetches the value of kanbanboard data
   */
  private _fetchData() {
    // all tasks
    this.service.findAllItems().subscribe(data => {
      this.taskList = data;
      console.log(this.taskList);
      this.pendingTasks = this.taskList.filter(t => t.status === 'pending');
      this.inprogressTasks = this.taskList.filter(t => t.status === 'inprogress');
      this.completedTasks = this.taskList.filter(t => t.status === 'completed');
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
    console.log(values);
    this._form.patchValue(values);
    this.openModal1(content);
  }








  closeModal(form, modal) {

    modal('close');
    form.reset();
  }
  // class end
}
