

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgbPaginationModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';

import { UIModule } from '../../shared/ui/ui.module';
import { NgxSmartModalModule } from 'ngx-smart-modal';

import { DevRoutingModule } from './foaieparcurs-routing.module';

//import {CalendarModule} from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { TreeTableModule } from 'primeng/treetable';
import { TreeModule } from 'primeng/tree';
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

import { ActionsModule } from '../_ewo/actions';
import { AdminGridModule } from '../_ewo/admin/admingrid';
import { AdminPropertiesModule } from '../_ewo/admin/adminprop';


import { FoaieParcursComponent } from './module_foaieparcurs/foaieparcurs.component';

import { ModuleTreePrimengComponent } from './module_treeprimeng/moduledemo.component';
import { ModuleSortableDirective, SortEvent } from './module-sortable.directive';
import { AutoComponent } from './auto/auto.component';
import { PartenerComponent } from './partener/partener.component';

import { PickListModule } from 'primeng/picklist';
import { TabsModule } from 'ngx-bootstrap';
import { ModuleDemoDefaultComponent } from './modulebase/moduledemo.component';

@NgModule({
    declarations: [
        ModuleSortableDirective,
        ModuleTreePrimengComponent,
        FoaieParcursComponent,
        AutoComponent,
        PartenerComponent,
        ModuleDemoDefaultComponent



    ],

    imports: [
        CommonModule,
        UIModule,
        DevRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        NgbPaginationModule,
        NgbTypeaheadModule,
        NgxSmartModalModule.forRoot(),

        TabsModule,

        DropdownModule, TableModule, TreeTableModule, TreeModule, TabViewModule, CodeHighlighterModule, DialogModule, ButtonModule, InputTextModule, CheckboxModule,
        ContextMenuModule, FileUploadModule, PickListModule,

        ActionsModule, AdminGridModule, AdminPropertiesModule,
    ]

})
export class FoaieParcursModule {

}
