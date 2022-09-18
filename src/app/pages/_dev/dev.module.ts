import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
// import { HttpClientModule, HttpClient } from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {NgbPaginationModule, NgbTypeaheadModule} from '@ng-bootstrap/ng-bootstrap';

import {UIModule} from '../../shared/ui/ui.module';
import {NgxSmartModalModule} from 'ngx-smart-modal';

import {DevRoutingModule} from './dev-routing.module';

//import {CalendarModule} from 'primeng/calendar';
import {DropdownModule} from 'primeng/dropdown';
import {TableModule} from 'primeng/table';
import {TreeTableModule} from 'primeng/treetable';
import {TreeModule} from 'primeng/tree';
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

import {ModuleGridDefaultComponent} from './module_griddefault/moduledemo.component';
import {ModuleGridPrimengComponent} from './module_gridprimeng/moduledemo.component';
import {ModuleGridDetailsPrimengComponent} from './module_gridprimeng_details/moduledemo.component';
import {ModuleTreePrimengComponent} from './module_treeprimeng/moduledemo.component';
import {ModuleTreeDetailsPrimengComponent} from './module_treeprimeng_details/moduledemo.component';
import { UboldComponent } from './ubold/ubold.component'; 

import { ReportGridPrimengComponent } from './report_gridprimeng/reportdemo.component'; 
import { ReportRowExpandPrimengComponent } from './report_rowexpandprimeng/reportdemo.component'; 
import { ReportColGroupPrimengComponent } from './report_colgroupprimeng/reportdemo.component'; 
import { ReportRowGroupPrimengComponent } from './report_rowgroupprimeng/reportdemo.component'; 

import {ModuleSortableDirective, SortEvent} from './module-sortable.directive';
import {PageDemoComponent} from './pagedemo/pagedemo.component';
import {DevdemoComponent} from './devdemo/devdemo.component';
import {UserAccessComponent} from './user-access/user-access.component';
import {PickListModule} from 'primeng/picklist';
import { RoleAccessComponent } from './role-access/role-access.component';
import { ModuleDemoDefaultComponent } from './modulebase/moduledemo.component';

@NgModule({
    declarations: [   
        ModuleSortableDirective,
        ModuleGridDefaultComponent,
        ModuleGridPrimengComponent,
        ModuleGridDetailsPrimengComponent,
        ModuleTreePrimengComponent,
        ModuleTreeDetailsPrimengComponent,
        UboldComponent,
        ModuleDemoDefaultComponent,
        ReportGridPrimengComponent,
        ReportRowExpandPrimengComponent,
        ReportColGroupPrimengComponent,
        ReportRowGroupPrimengComponent,

        PageDemoComponent,
        DevdemoComponent,  
        UserAccessComponent, RoleAccessComponent
        
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

        DropdownModule, TableModule, TreeTableModule, TreeModule, TabViewModule, CodeHighlighterModule, DialogModule, ButtonModule, InputTextModule, CheckboxModule,
        ContextMenuModule, FileUploadModule, PickListModule,

        ActionsModule, AdminGridModule, AdminPropertiesModule,
    ]

})
export class DevModule {
    
}
