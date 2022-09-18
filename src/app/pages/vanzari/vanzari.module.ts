import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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

import { VanzariRoutingModule } from './vanzari-routing.module';

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
/*import {MenuItem, Header, Footer} from 'primeng/components/common/api';*/
// import {EditorModule} from 'primeng/editor';
import {FileUploadModule} from 'primeng/fileupload';

import {ActionsModule} from '../_ewo/actions';
import {AdminGridModule} from '../_ewo/admin/admingrid';
import {AdminPropertiesModule} from '../_ewo/admin/adminprop';

import { ContractComponent } from './contract/contract';
import { OfertaComponent } from './oferta/oferta';

import { ProductcatComponent } from './productcat/productcat';

@NgModule({
  declarations: [
    ContractComponent,
    OfertaComponent,
    ProductcatComponent],
    
  imports: [
    CommonModule,
    UIModule,
    VanzariRoutingModule,
    HttpModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    DndModule,
    FullCalendarModule,

    NgbDropdownModule, NgbModalModule, NgbTypeaheadModule,
    NgbPaginationModule, NgbProgressbarModule, NgbTooltipModule,

    NgxSmartModalModule.forRoot(),

    ActionsModule, AdminGridModule, AdminPropertiesModule,

    DropdownModule,TableModule,TreeTableModule,TreeModule,TabViewModule,CodeHighlighterModule,DialogModule,ButtonModule,InputTextModule,CheckboxModule,
    ContextMenuModule,FileUploadModule
  ]
})
export class VanzariModule { }
