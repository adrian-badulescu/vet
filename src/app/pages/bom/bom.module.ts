

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BOMRoutingModule } from './bom-routing.module';
import { BomComponent } from './bom.component';
import { UIModule } from 'src/app/shared/ui/ui.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbPaginationModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxSmartModalModule } from 'ngx-smart-modal';
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
import { PickListModule } from 'primeng/picklist';
import { ActionsModule } from '../_ewo/actions';
import { AdminGridModule } from '../_ewo/admin/admingrid';
import { AdminPropertiesModule } from '../_ewo/admin/adminprop';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { PipesModule } from './../../pipes/pipes.module';


@NgModule({
  declarations: [
    BomComponent,
    
    
  ],
  imports: [
    CommonModule,
    BOMRoutingModule,
    TabsModule,
    PipesModule,    
    UIModule,    
    FormsModule,
    ReactiveFormsModule,
    NgbPaginationModule,
    NgbTypeaheadModule,
    NgxSmartModalModule.forRoot(),

    DropdownModule, TableModule, TreeTableModule, TreeModule, TabViewModule, CodeHighlighterModule, DialogModule, ButtonModule, InputTextModule, CheckboxModule,
    ContextMenuModule, FileUploadModule, PickListModule,

    ActionsModule, AdminGridModule, AdminPropertiesModule,
  ],
  providers: []
})
export class BomModule { }
