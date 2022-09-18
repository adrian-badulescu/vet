


import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgbPaginationModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';

import { UIModule } from '../../shared/ui/ui.module';
import { NgxSmartModalModule } from 'ngx-smart-modal';

import { ArticleRoutingModule } from './article-routing.module';

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

import { ActionsModule } from '../_ewo/actions';
import { AdminGridModule } from '../_ewo/admin/admingrid';
import { AdminPropertiesModule } from '../_ewo/admin/adminprop';
import { TabsModule } from 'ngx-bootstrap/tabs';

import { ModuleSortableDirective, SortEvent } from './module-sortable.directive';
import { ArticleComponent } from './article/article.component';
import { CategoriesComponent } from './categories/categories.component';
import { CustomsComponent } from './customs_declaration/customs.component';
import { AccountsComponent } from './accounts/accounts.component';
import { PipesModule } from './../../pipes/pipes.module';


@NgModule({
  declarations: [
    ModuleSortableDirective,
    ArticleComponent,
    CategoriesComponent,
    CustomsComponent,
    AccountsComponent,
    
    

  ],

  imports: [
    CommonModule,
    UIModule,
    ArticleRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbPaginationModule,
    NgbTypeaheadModule,
    PipesModule,
    NgxSmartModalModule.forRoot(),

    DropdownModule, TableModule, TreeTableModule, TreeModule, TabViewModule, CodeHighlighterModule, DialogModule, ButtonModule, InputTextModule, CheckboxModule,
    ContextMenuModule, FileUploadModule,
    TabsModule,

    ActionsModule, AdminGridModule, AdminPropertiesModule,
  ],
  providers: []

})
export class ArticleModule { }
