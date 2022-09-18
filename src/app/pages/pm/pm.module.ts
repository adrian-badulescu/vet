
import { NgModule } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {
  NgbDropdownModule, NgbModalModule, NgbTypeaheadModule,
  NgbPaginationModule, NgbProgressbarModule, NgbTooltipModule
} from '@ng-bootstrap/ng-bootstrap';

import { UIModule } from '../../shared/ui/ui.module';

import { NgxSmartModalModule } from 'ngx-smart-modal';
import { DndModule } from 'ngx-drag-drop';
import { FullCalendarModule } from '@fullcalendar/angular';

import { NgApexchartsModule } from 'ng-apexcharts';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

import { PMRoutingModule } from './pm-routing.module';

//import {CalendarModule} from 'primeng/calendar';
import {DropdownModule} from 'primeng/dropdown';
import {TableModule} from 'primeng/table';
import {TreeTableModule} from 'primeng/treetable';  
import {TreeModule} from 'primeng/tree';
import {TreeNode} from 'primeng/api';
//import {DataTableModule} from 'primeng/datatable';
import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import {CheckboxModule} from 'primeng/checkbox';
import {DialogModule} from 'primeng/dialog';
import {CodeHighlighterModule} from 'primeng/codehighlighter';
import {TabViewModule} from 'primeng/tabview';
/*import {TabPanel} from 'primeng/tabpanel';*/
/*import {Column} from 'primeng/column';*/
import {ContextMenuModule} from 'primeng/contextmenu'
/*import {MenuItem, Header, Footer} from 'primeng/components/common/api';*/
// import {EditorModule} from 'primeng/editor';
import {FileUploadModule} from 'primeng/fileupload';

import { TicketsComponent } from './tickets/tickets.component';
import { ProjectsComponent } from './projects/projects.component';
import { CalendarComponent } from './calendar/calendar.component';

import { ContactsComponent } from './contacts/contacts.component';
import { CustomersComponent } from './customers/customers.component';
import { LeadsComponent } from './leads/leads.component';
import { OpportunitiesComponent } from './opportunities/opportunities.component';
import { ResourceComponent } from './resource/resource.component';
import { TicketsSortableDirective } from './tickets/tickets-sortable.directive';

@NgModule({
  declarations: [
    TicketsSortableDirective,
    TicketsComponent,
    ProjectsComponent,  
    CalendarComponent,
    ContactsComponent,
    CustomersComponent,
    LeadsComponent,
    OpportunitiesComponent,
    ResourceComponent,
    
  ],
  imports: [
    CommonModule,
    UIModule,
    PMRoutingModule,
    HttpModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    DndModule,
    FullCalendarModule,

    NgApexchartsModule,
    Ng2SearchPipeModule,

    NgbDropdownModule, NgbModalModule, NgbTypeaheadModule,
    NgbPaginationModule, NgbProgressbarModule, NgbTooltipModule,

    NgxSmartModalModule.forRoot(),

    DropdownModule,TableModule,TreeTableModule,TreeModule,TabViewModule,CodeHighlighterModule,DialogModule,ButtonModule,InputTextModule,CheckboxModule,
    ContextMenuModule,FileUploadModule
  ],
  providers: [DecimalPipe]
})
export class PMModule { }
