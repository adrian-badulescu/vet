import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgbPaginationModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';

import { UIModule } from '../../shared/ui/ui.module';
import { NgxSmartModalModule } from 'ngx-smart-modal';
import { TabsModule } from 'ngx-bootstrap/tabs';

import { AccountingRoutingModule } from './accounting-routing.module';
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
import { BuyComponent } from './buy/buy.component';
import { SellComponent } from './sell/sell.component';
import { ConturiGridComponent } from './conturi_grid/conturi.component';
import { ConturiTreeComponent } from './conturi_tree/conturi.component';
import { AccountingnoteComponent } from './accounting_note/accountingnote.component';
import { ActionsModule } from '../_ewo/actions';
import { AdminGridModule } from '../_ewo/admin/admingrid';
import { PickListModule } from 'primeng/picklist';
import { AdminPropertiesModule } from '../_ewo/admin/adminprop';
import { BonmaterialComponent } from './bonmaterial/bonmaterial.component';
import { NotarestituireComponent } from './notarestituire/notarestituire.component';
import { BtmaterialeComponent } from './btmateriale/btmateriale.component';
import { BtinventarComponent } from './btinventar/btinventar.component';
import { AvizexpeditieComponent } from './avizexpeditie/avizexpeditie.component';
import { NotapredareComponent } from './notapredare/notapredare.component';
import { PaybuyComponent } from './paybuy/paybuy.component';
import { DecontComponent } from './deconturi/decont.component';
import { BorderouComponent } from './borderou/borderou.component';
import { GestionarComponent } from './gestionar/gestionar.component';

@NgModule({
  declarations: [
    ModuleSortableDirective,
    BuyComponent,
    SellComponent,
    ConturiGridComponent,
    ConturiTreeComponent,
    AccountingnoteComponent,
    BonmaterialComponent,
    NotarestituireComponent,
    BtmaterialeComponent,
    BtinventarComponent,
    AvizexpeditieComponent,
    NotapredareComponent,
    PaybuyComponent,
    DecontComponent,
    BorderouComponent,
    GestionarComponent
  ],

  imports: [
    CommonModule,
    UIModule,
    AccountingRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbPaginationModule,
    NgbTypeaheadModule,
    NgxSmartModalModule.forRoot(),
    AlertModule.forRoot(), TabsModule.forRoot(),

    DropdownModule, TableModule, TreeTableModule, TreeModule, TabViewModule, CodeHighlighterModule, DialogModule, ButtonModule, InputTextModule, CheckboxModule,
    ContextMenuModule, FileUploadModule,
    ActionsModule, PickListModule, AdminGridModule, AdminPropertiesModule,

   
  ],

})
export class AccountingModule { }