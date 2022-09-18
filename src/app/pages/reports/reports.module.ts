import { GanttComponent } from './gantt/gantt.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgbPaginationModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbDropdownModule, NgbTabsetModule, NgbAccordionModule, NgbCollapseModule, NgbModalModule, NgbProgressbarModule, NgbAlertModule, NgbToastModule, NgbPopoverModule, NgbTooltipModule, NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
// import { ModuleSortableDirective, SortEvent } from '../_ewo/base/module-sortable.directive';
import { ReportComponent } from '../_ewo/base/report/report';
import { ModuleComponent } from '../_ewo/base/module/module';

import { UIModule } from '../../shared/ui/ui.module';
import { NgxSmartModalModule } from 'ngx-smart-modal';

import { PipesModule } from "../../pipes/pipes.module";

import { ReportsRoutingModule } from './reports-routing.module';

//import {CalendarModule} from 'primeng/calendar';
import {DropdownModule} from 'primeng/dropdown';
import {TableModule} from 'primeng/table';
import {TreeTableModule} from 'primeng/treetable';  
import {TreeModule} from 'primeng/tree';
import {TreeNode} from 'primeng/api';
import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import {CheckboxModule} from 'primeng/checkbox';
import {DialogModule} from 'primeng/dialog';
import {CodeHighlighterModule} from 'primeng/codehighlighter';
import {TabViewModule} from 'primeng/tabview';
/*import {TabPanel} from 'primeng/tabpanel';*/
/*import {Column} from 'primeng/column';*/
import {ContextMenuModule} from 'primeng/contextmenu'
import { InventorySortableDirective } from './inventory/inventory-sortable.directive';
/*import {MenuItem, Header, Footer} from 'primeng/components/common/api';*/
// import {EditorModule} from 'primeng/editor';
import {FileUploadModule} from 'primeng/fileupload';

import { InventoryComponent } from './inventory/inventory.component';
import { InvoicesComponent } from './invoices/invoices.component';

import { PrintcerereofertaComponent } from './printcerereoferta/printcerereoferta.component';
import { PrintinvoiceComponent } from './printinvoice/printinvoice.component';
import { CerereOfertaComponent } from './cerereoferta/cerereoferta.component';

import { TaskComponent } from './task/task.component';
import { PartnerxdivizieComponent } from './partnerxdivizie/partnerxdivizie.component';
import { ReceptieComponent } from './receptie/receptie.component';

import { PrintinventoryComponent } from './printinventory/printinventory.component';

import { PrintTableComponent } from './printtable/printtable.component';
import { NgGanttEditorModule } from 'ng-gantt' ;

//accounting

import { JurnalComponent } from './jurnal/jurnal.component';
import { SortableModule } from 'ngx-bootstrap';
import { PrintcerereofertaSortableDirective } from './printcerereoferta/printcerereoferta-sortable.directive';


@NgModule({   
  declarations: [ 
    // ModuleSortableDirective,
    PrintcerereofertaSortableDirective,
    InventorySortableDirective,
  InventoryComponent,
  InvoicesComponent,
  PrintcerereofertaComponent,
  PrintinvoiceComponent,
  CerereOfertaComponent,
  TaskComponent,
  PartnerxdivizieComponent,
  ReceptieComponent,
  ReportComponent,
  // ModuleComponent,
  // ModuleSortableDirective,
  PrintinventoryComponent,  
  PrintTableComponent,
  GanttComponent,
  JurnalComponent

],
  imports: [
    SortableModule,
    CommonModule,
    UIModule,
    ReportsRoutingModule,    
    FormsModule,
    ReactiveFormsModule,
    NgbPaginationModule,
    NgbTypeaheadModule,
    NgxSmartModalModule.forRoot(),
    PipesModule,
    NgGanttEditorModule,
    NgbDropdownModule,
    NgbTabsetModule,
    NgbAccordionModule,
    NgbCollapseModule,
    NgbModalModule,
    NgbProgressbarModule,
    NgbAlertModule,
    NgbToastModule,
    NgbPopoverModule,
    NgbTooltipModule,
    NgbCarouselModule,

    DropdownModule,TableModule,TreeTableModule,TreeModule,TabViewModule,CodeHighlighterModule,DialogModule,ButtonModule,InputTextModule,CheckboxModule,
    ContextMenuModule,FileUploadModule
  ],
  providers: []
 
})
export class ReportsModule { }
