import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {HttpModule} from '@angular/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {NgbPaginationModule, NgbTypeaheadModule} from '@ng-bootstrap/ng-bootstrap';

import {UIModule} from '../../shared/ui/ui.module';

import {NgxSmartModalModule} from 'ngx-smart-modal';

import {DocumentsRoutingModule} from './documents-routing.module';

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
import {RegisterComponent} from './register/register.component';
import {TabsModule} from 'ngx-bootstrap/tabs';
import {LightboxModule} from 'primeng/lightbox';
import {ImageCropperModule} from "ngx-image-cropper";

@NgModule({
    declarations: [FileManagerComponent,
        RegisterComponent
    ],
    imports: [
        CommonModule,
        UIModule,
        DocumentsRoutingModule,
        HttpModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        NgbPaginationModule,
        NgbTypeaheadModule,

        NgxSmartModalModule.forRoot(),

        DropdownModule, TableModule, TreeTableModule, TreeModule, TabViewModule, CodeHighlighterModule, DialogModule, ButtonModule, InputTextModule, CheckboxModule,
        ContextMenuModule, FileUploadModule, TabsModule,
        LightboxModule, ImageCropperModule
    ]
})
export class DocumentsModule {
}
