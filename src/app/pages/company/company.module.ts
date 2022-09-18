

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FirmaComponent } from './firma/firma.component';
import { CompanyRoutingModule } from './company-routing.module';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {ToastModule} from 'primeng/toast';
import { NgbModalModule, NgbPaginationModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { NgApexchartsModule } from 'ng-apexcharts';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { TreeTableModule } from 'primeng/treetable';
import { TreeModule } from 'primeng/tree';
import { TabViewModule } from 'primeng/tabview';
import { CodeHighlighterModule } from 'primeng/codehighlighter';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { ContextMenuModule } from 'primeng/contextmenu';
import { FileUploadModule } from 'primeng/fileupload';
import { UIModule } from 'src/app/shared/ui/ui.module';
import { TabsModule } from 'ngx-bootstrap';
import { NgxUploaderModule } from 'ngx-uploader';
import { AdminaliasComponent } from './admin_alias/adminalias.component';





@NgModule({
  declarations: [FirmaComponent,
  AdminaliasComponent],
  imports: [
    CommonModule,
    CompanyRoutingModule,
    FormsModule, ReactiveFormsModule,
    MessagesModule, MessageModule, ToastModule,
    NgbModalModule, NgbPaginationModule, NgbTypeaheadModule,
    NgApexchartsModule, Ng2SearchPipeModule,

    DropdownModule, TableModule, TreeTableModule, TreeModule, TabViewModule, CodeHighlighterModule, 
    DialogModule, ButtonModule, InputTextModule, CheckboxModule,
    ContextMenuModule, FileUploadModule, MessagesModule, MessageModule, ToastModule, UIModule,

    TabsModule,NgxUploaderModule

 
  ]
})
export class CompanyModule { }
