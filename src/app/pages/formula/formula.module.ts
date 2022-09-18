

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgbPaginationModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';

import { UIModule } from '../../shared/ui/ui.module';
import { NgxSmartModalModule } from 'ngx-smart-modal';
import { TabsModule } from 'ngx-bootstrap/tabs';

import { FormulaRoutingModule } from './formula-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { AlertModule } from 'ngx-bootstrap/alert';


//import {CalendarModule} from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { TreeTableModule } from 'primeng/treetable';
import { TreeModule } from 'primeng/tree';
import { TreeNode } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { DialogModule } from 'primeng/dialog';
import { CodeHighlighterModule } from 'primeng/codehighlighter';
import { TabViewModule } from 'primeng/tabview';
/*import {TabPanel} from 'primeng/tabpanel';*/
/*import {Column} from 'primeng/column';*/
import { ContextMenuModule } from 'primeng/contextmenu'
/*import {MenuItem, Header, Footer} from 'primeng/components/common/api';*/
// import {EditorModule} from 'primeng/editor';
import { FileUploadModule } from 'primeng/fileupload';

import { ModuleSortableDirective, SortEvent } from './module-sortable.directive';
import { FormulaComponent } from './formula/formula.component';
import { AvizComponent } from './aviz/aviz.component';
import { BonFiscalComponent } from './bon_fiscal/bon_fiscal.component';
import { ActionsModule } from '../_ewo/actions';


@NgModule({
  declarations: [
    ModuleSortableDirective,
    FormulaComponent,
    AvizComponent,
    BonFiscalComponent

  ],

  imports: [
    CommonModule,
    UIModule,
    FormulaRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbPaginationModule,
    NgbTypeaheadModule,
    NgxSmartModalModule.forRoot(),
    AlertModule.forRoot(), TabsModule.forRoot(),

    DropdownModule, TableModule, TreeTableModule,
    TreeModule, TabViewModule, CodeHighlighterModule, DialogModule, ButtonModule, InputTextModule, CheckboxModule,
    ContextMenuModule, FileUploadModule,
    ActionsModule
  ],

})
export class FormulaModule { }