
import { Observable } from 'rxjs';

import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FullCalendarComponent } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGrigPlugin from '@fullcalendar/timegrid';
import interactionPlugin, { Draggable } from '@fullcalendar/interaction';
import bootstrapPlugin from '@fullcalendar/bootstrap';
import { EventInput } from '@fullcalendar/core';

import { IEvent } from './event.model';

import { category, calendarEvents } from './data';
// import { CalendarService } from './calendar.service';
import { ModuleService } from './../../_services/module.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  providers: [ModuleService]

})

/**
 * Calendar component - handling the calendar with sidebar and content
 */
export class CalendarComponent implements OnInit {
  @ViewChild('calendar', { static: false }) calendarComponent: FullCalendarComponent;
  item: object;
  id: IEvent['id'];
  start: IEvent['start'];
  title: IEvent['title'];

  deleteId: any;
  // Bread crumb tems
  breadCrumbItems: Array<{}>;
  entity: string;
  // event form
  formData: FormGroup;
  formEditData: FormGroup;

  // Form submition value
  submitted: boolean;

  // Form category data
  category: IEvent[];

  // Date added in event
  newEventDate: Date;

  // Edit event
  editEvent: EventInput;

  // Delete event
  deleteEvent: EventInput;

  Category = [
    {
      name: 'Danger',
      value: 'bg-danger'
    },
    {
      name: 'Success',
      value: 'bg-success'
    },
    {
      name: 'Primary',
      value: 'bg-primary'
    },
    {
      name: 'Info',
      value: 'bg-info'
    },
    {
      name: 'Dark',
      value: 'bg-dark'
    },
    {
      name: 'Warning',
      value: 'bg-warning'
    }
  ]

  // calendar plugin
  calendarPlugins = [dayGridPlugin, bootstrapPlugin, timeGrigPlugin, interactionPlugin];
  droppable: true;
  calendarWeekends: any;
  // show events
  calendarEvents: EventInput[];

  constructor(private modalService: NgbModal, private formBuilder: FormBuilder, private service: ModuleService) {
    this.service.entity = 'calendar';
  }

  ngOnInit() {
    this.breadCrumbItems = [{ label: 'Dashboard', path: '/' }, { label: 'PM', path: '/' }, { label: 'Calendar', path: '/', active: true }];

    /**
     * Event Model validation
     */
    this.formData = this.formBuilder.group({
      id: [''],
      title: ['', [Validators.required]],
      start: ['', [Validators.required]]
    });

    /**
     * Edit Event Model Data
     */
    this.formEditData = this.formBuilder.group({
      id: [''],
      title: ['', [Validators.required]],
      start: ['', [Validators.required]]
    });

    /**
     * Fetches Data
     */
    this._fetchData();
    console.log(calendarEvents);

  }

  dateClick(model) {
    console.log(model);
  }

  eventDragStop(model) {
    console.log(model);
    const id = model.event.id;
    const title = model.event.title;
    const start = model.event.start;

    this.editEvent = {
      id,
      title,
      start,
    };
    delete this.editEvent.id;
    // const editclassName =this.formEditData.get('editClassName').value;
    // tslint:disable-next-line: radix
    this.calendarEvents['id'] = { ...this.editEvent, title: title, id: parseInt(this.editEvent.id + ''), start: start };
    this.formEditData = this.formBuilder.group({
      id: '',
      title: '',
      start: ''
    });
    this.calendarEvents = this.calendarEvents.concat({
      id: this.calendarEvents.length + 1,
      title,
      start: start || new Date()
    });
    this.modalService.dismissAll();

    this.service.updateItem(id, this.editEvent).subscribe(
      data => {
        this.getMeeting(id);
        this.editEvent = data;
        console.log(id);
        this._fetchData();
      });
    this.submitted = true;
    
  }

  /**
   * Returns form
   */
  get form() {
    return this.formData.controls;
  }
  get editform() {
    return this.formEditData.controls;
  }

  /**
   * Open Event Modal
   * @param content modal content
   * @param event calendar event
   */
  openModal(content: any, event: any) {
    this.newEventDate = event.date;
    this.modalService.open(content, { centered: true, size: 'sm' });
  }

  /**
   * Open Event Modal For Edit
   * @param editcontent modal content
   * @param event calendar event
   */
  openEditModal(editcontent: any, event: any) {
    this.formEditData = this.formBuilder.group({
      id: event.event.id,
      title: event.event.title,
      start: event.event.start
    });
    // tslint:disable-next-line: max-line-length
    this.editEvent = { id: event.event.id, title: event.event.title, start: event.event.start };
    this.modalService.open(editcontent);
  }

  /**
 * Model Data save and show the event in calendar
 */
  saveEvent() {

    if (this.formData.valid) {


      const id = this.guid();
      const title = this.formData.get('title').value;
      const start = this.formData.get('start').value;
  
      console.log(title);
      console.log(start);
      console.log(this.calendarEvents);
      this.editEvent = {
        id: id,
        title: title,
        start: start,
      };

      // this.editEvent = this.item;
      console.log(this.editEvent);
      this.calendarEvents = this.calendarEvents.concat({
        id: this.calendarEvents.length + 1,
        title: title,
        start: start || new Date()

      });

      this.formData = this.formBuilder.group({
        id: '',
        title: '',
        start: ''

      });
      this.modalService.dismissAll();
    }


    this.service._createItem(this.editEvent).subscribe((data: any) => {
      (data => console.log('Done posting: ' + data));
      console.log(this.editEvent);
      console.log(this.calendarEvents);
    });
    this.submitted = true;

  }

  /**
   * Upldated event title save in calendar
   */
  editEventSave(item) {
    const id = this.formEditData.get('id').value;
    const title = this.formEditData.get('title').value;
    const start = this.formEditData.get('start').value;

    this.editEvent = {
      id,
      title,
      start,
    };
    delete this.editEvent.id;
    // const editclassName =this.formEditData.get('editClassName').value;
    // tslint:disable-next-line: radix
    this.calendarEvents[id] = { ...this.editEvent, title: title, id: parseInt(this.editEvent.id + ''), start: start };
    this.formEditData = this.formBuilder.group({
      id: '',
      title: '',
      start: ''
    });
    this.calendarEvents = this.calendarEvents.concat({
      id: this.calendarEvents.length + 1,
      title,
      start: start || new Date()
    });
    this.modalService.dismissAll();

    this.service.updateItem(id, this.editEvent).subscribe(
      data => {
        this.getMeeting(id);
        this.editEvent = this.service.tableData as any;
        console.log(id);
        this._fetchData();
      });
    this.submitted = true;
    
  }

  /**
   * Delete the event from calendar
   */
  deleteEventData(id) {
    this.deleteId = this.editEvent.id;
    this.service.deleteItem(this.deleteId).subscribe((res) => {
      this.calendarEvents.splice(id, 1);
    });
    const deleteEvent = this.calendarEvents.findIndex(x => x.id + '' === this.deleteId + '');
    this.calendarEvents[deleteEvent] = { ...this.deleteEvent, id: '' };
    delete this.calendarEvents[deleteEvent].id;
    console.log(this.deleteId);

    this.modalService.dismissAll();
  }



  /**
   * Fetches the required data
   */
  private _fetchData(): any {
    // Event category
    // Calender Event Data
    this.service.findAllItems().subscribe((data) => {
      console.log(this.service.tableData);
      return this.calendarEvents = this.service.tableData as any;
      
    });


    // form submit
    this.submitted = false;
  }

  getMeeting(id) {
    this.service.getItem(id).subscribe(data => {
      this.deleteId = data.id;
      this.formData.patchValue(this.editEvent);
      console.log('from getItem():  ' + JSON.stringify(this.deleteId));
    });
  }

  s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  guid() {

    return this.s4() + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' +
      this.s4() + '-' + this.s4() + this.s4() + this.s4();
  }
}
