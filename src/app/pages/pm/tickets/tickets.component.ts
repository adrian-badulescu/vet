import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { DecimalPipe } from '@angular/common';
import { Observable, of } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { CardData, TableData } from './tickets.model';

// import { cardData } from './data';

import { TicketService } from './ticket.service';

import { TicketsSortableDirective, SortEvent } from './tickets-sortable.directive';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.scss'],
  providers: [TicketService, DecimalPipe]
})

/**
 * Tickets component - handling the tickets with sidebar and content
 */
export class TicketsComponent implements OnInit {
  item: object;
  _id: string;
  submitted: boolean;
  // bread crumb items
  breadCrumbItems: Array<{}>;
  totalRecords = 10;
  // Card Data
  cardData: CardData[];
  icon: string;

  // Table data
  tableData: TableData[];
  Priority: Array<string> = ['Inalta', 'Medie', 'Scazuta'];
  Status: Array<string> = ['Ticket Deschis', 'In curs de remediere', 'Ticket Inchis'];

  // page number
  page = 1;
  // default page size
  pageSize = 10;

  // start and end index
  startIndex = 1;
  endIndex = 10;
  totalSize = 0;
  paginatedContactData: Array<TableData>;
  inventorylist: Array<TableData>;

  tickets$: Observable<TableData[]>;
  total$: Observable<number>;
  // validation form
  validationform: FormGroup;

  @ViewChildren(TicketsSortableDirective) headers: QueryList<TicketsSortableDirective>;

  constructor(public modalService: NgbModal, public formBuilder: FormBuilder, public service: TicketService) {
    this.tickets$ = service.tickets$;
    this.total$ = service.total$;
  }

  ngOnInit() {
    this.breadCrumbItems = [{ label: 'Dashboard', path: '/' }, { label: 'PM', path: '/' }, { label: 'Tickets', path: '/', active: true }];
    this.validationform = this.formBuilder.group({
      id: [''],
      subject: ['', [Validators.required]],
      priority: ['', [Validators.required]],
      status: ['', [Validators.required]],
      createddate: ['', [Validators.required]],
      duedate: ['', [Validators.required]],
      // reservation: ['', [Validators.required, Validators.pattern('[+-]?([0-9]*[.])?[0-9]+')]],
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
  * save the inventorylist data
  */
  saveData() {
    const id = this.validationform.get('id').value;
    const subject = this.validationform.get('subject').value;
    const priority = this.validationform.get('priority').value;
    const status = this.validationform.get('status').value;
    const createddate = this.validationform.get('createddate').value;
    const duedate = this.validationform.get('duedate').value;


    this.item = {
      id,
      subject,
      priority,
      status,
      createddate,
      duedate
    };

    // const currentDate = new Date();
    if (this.validationform.valid) {

      this.inventorylist.push({
        // image: 'assets/images/users/user-1.jpg', 
        id,
        subject,
        priority,
        status,
        createddate,
        duedate

        // created_at
        // date: currentDate.getDate() + '/' + currentDate.getMonth() + '/' + currentDate.getFullYear()
      });
      this.validationform = this.formBuilder.group({
        id: '',
        subject: '',
        priority: '',
        status: '',
        createddate: '',
        duedate: ''

      });
      this.modalService.dismissAll();
    }
    this.submitted = true;
    this.totalSize = this.inventorylist.length + 1;
    this.paginatedContactData = this.inventorylist.slice(this.startIndex, this.endIndex);
    console.log('this is the inventory list: ' + JSON.stringify(this.item));
    this.service._createTicket(this.item).subscribe((data: any) => {
      (data => console.log('Done posting: ' + data));
    });
    console.log(this.item);
  }

  /**
   * Sort table data

   *
   */
  onSort({ column, direction }: SortEvent) {
    // resetting other headers
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });
    this.service.sortColumn = column;
    this.service.sortDirection = direction;
  }

  /**
 * Pagination onpage change
 * @param page show the page
 */
  onPageChange(page: any): void {
    this.startIndex = (page - 1) * this.pageSize;
    this.endIndex = (page - 1) * this.pageSize + this.pageSize;
    this.paginatedContactData = this.inventorylist.slice(this.startIndex, this.endIndex);
    console.log(this.paginatedContactData);
  }


  private _fetchData() {

    // Tickets Table Data
    // this.tableData = tableData;
    this.service.findAllTickets().subscribe((data) => {
      console.log(data);
      this.tickets$ = of(data);
      this.inventorylist = data;
      this.startIndex = 0;
      this.endIndex = this.pageSize;
      this.paginatedContactData = this.inventorylist.slice(this.startIndex, this.endIndex);
      this.totalSize = this.inventorylist.length;
      const preliminary = [];
      const statPending = [];
      const statClosed = [];
      const statOpen = [];

      this.inventorylist.forEach(function (el) {
        if (el) {
          preliminary.push(el.status);
        }
        console.log(preliminary);
        return preliminary;

      });

      preliminary.forEach(function (el) {
        if (el === 'Ticket Inchis') { statClosed.push(el); return statClosed; } else if (!el) { statClosed.length = 0 }
        else if (el === 'Ticket Deschis') { statOpen.push(el); return statOpen; } else if (!el) { return statOpen.length = 0 }
        else { statPending.push(el); return statPending }

      });

      // Tickets Card Data
      this.cardData = [
        {
          icon: 'fe-tag',
          tickets: this.inventorylist.length,
          title: 'Total Tickete',
          text: '',
        },
        {
          icon: 'fe-clock',
          tickets: statPending.length,
          title: 'In curs de remediere',
          text: 'warning'
        },
        {
          icon: 'fe-check-circle',
          tickets: statClosed.length,
          title: 'Tickete Inchise',
          text: 'success'
        },
        {
          icon: 'fa-exclamation-triangle',
          tickets: statOpen.length,
          title: 'Tickete Deschise',
          text: 'danger'
        }
      ];

    });

  }

  openModal(content: string) {
    this.modalService.open(content, { centered: true, size: 'xl' });
  }

  getTicket(id) {
    this.service.getTicket(id).subscribe(data => {
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

  updateTicket(id, item) {
    delete item['id'];
    this.service.updateTicket(id, item).subscribe(
      data => {
        this.getTicket(id);
        this._fetchData();
        item = data;
      });
  }

  deleteTicket(id) {
    this.service.deleteTicket(id).subscribe(res => {
      this.inventorylist.splice(id, 1);
      this._fetchData();
    });
  }

  onSubmit(values: object, form, modal) {
    if (values['id']) {
      //update
      this.updateTicket(values['id'], values);
      this.closeModal(form, modal);
    } else {
      //post
      this.saveData();
      this._fetchData();
      console.log(values);
    }
    
  }

  closeModal(form, modal) {
    form.reset();
    modal('close');
  }

}
