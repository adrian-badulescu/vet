import {NgModule} from '@angular/core';
import {CommonModule, DecimalPipe} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {HttpModule} from '@angular/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {NgbPaginationModule, NgbTypeaheadModule} from '@ng-bootstrap/ng-bootstrap';
import {PaginatorModule, Paginator} from 'primeng/paginator';
import {UIModule} from '../../shared/ui/ui.module';

import {NgxSmartModalModule} from 'ngx-smart-modal';

import {ReportsRoutingModule} from './reports-routing.module';

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

import {FileManagerComponent} from './filemanager/filemanager';
import {ActivityReportComponent} from './activity/activity.component';
import {TabsModule} from 'ngx-bootstrap/tabs';
import {LightboxModule} from 'primeng/lightbox';
import {ImageCropperModule} from "ngx-image-cropper";
import { AlertModule } from 'ngx-bootstrap';
import { ActionsModule } from '../_ewo/actions';
import { PickListModule } from 'primeng/picklist';
import { AdminGridModule } from '../_ewo/admin/admingrid';
import { AdminPropertiesModule } from '../_ewo/admin/adminprop';
import { BooleanPipe } from '../farm/boolean.pipe';

import { UserTrackerComponent } from './user-tracker/user-tracker.component';
import { AnimalGroupsComponent } from './animal-groups/animal-groups.component';

@NgModule({
    declarations: [
        ActivityReportComponent,
        FileManagerComponent,       
        UserTrackerComponent,
        AnimalGroupsComponent,
        // Paginator
    ],
    imports: [
        CommonModule,
        UIModule,
        ReportsRoutingModule,  
        FormsModule,
        ReactiveFormsModule,
        NgbPaginationModule,
        NgbTypeaheadModule,
        PaginatorModule,

        NgxSmartModalModule.forRoot(),
        AlertModule.forRoot(),
        TabsModule.forRoot(),
        UIModule,

        DropdownModule, TableModule, TreeTableModule,
         TreeModule, TabViewModule, CodeHighlighterModule, DialogModule, ButtonModule, InputTextModule, CheckboxModule,
        ContextMenuModule, FileUploadModule, TabsModule,   ActionsModule,
        PickListModule,
        AdminGridModule,
        AdminPropertiesModule,
        LightboxModule, ImageCropperModule
    ], providers: [DecimalPipe, BooleanPipe]
})
export class ReportsModule {
}
