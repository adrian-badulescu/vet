import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UIModule } from '../../shared/ui/ui.module';
import { NgbModalModule, NgbPaginationModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { NgApexchartsModule } from 'ng-apexcharts';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

import { CRMRoutingModule } from './inventory-routing.module';

//import {CalendarModule} from 'primeng/calendar';
import {DropdownModule} from 'primeng/dropdown';
import {TableModule} from 'primeng/table';
import {TreeTableModule} from 'primeng/treetable';  
import {TreeModule} from 'primeng/tree';
import { TreeNode, MessageService } from 'primeng/api';
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
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {ToastModule} from 'primeng/toast';


import { InventoryListComponent } from './inventorylist/inventorylist.component';
import { InvoicesComponent } from './invoices/invoices.component';

@NgModule({
  declarations: [
    InventoryListComponent,
    InvoicesComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    UIModule,
    NgbModalModule,
    NgbPaginationModule,
    NgApexchartsModule,
    NgbTypeaheadModule,
    CRMRoutingModule,
    Ng2SearchPipeModule,

    DropdownModule, TableModule, TreeTableModule, TreeModule, TabViewModule, CodeHighlighterModule, 
    DialogModule, ButtonModule, InputTextModule, CheckboxModule,
    ContextMenuModule, FileUploadModule, MessagesModule, MessageModule, ToastModule
  ],
  providers: [MessageService]
})
export class InventoryModule { }
