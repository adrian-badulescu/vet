
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbPaginationModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxSmartModalModule } from 'ngx-smart-modal';

import { DashboardsModule } from './dashboards/dashboards.module';
import { UiModule } from './ui/ui.module';
import { IconsModule } from './icons/icons.module';
import { ChartModule } from './chart/chart.module';


import { AdminUIModule } from './adminUI/adminUI.module';
import { ErrorModule } from './error/error.module';

import { DocumentsModule } from './documents/documents.module';

import { PagesRoutingModule } from './pages-routing.module';

import { FarmModule } from './farm/farm.module';
import { MatSliderModule } from '@angular/material/slider';
import { ReportsModule } from './reports/reports.module';
import { ModuleSortableDirective } from './_directives/module-sortable.directive'
// import { AppModule } from '../app.module';
import { Base } from './_ewo/base';

@NgModule({
  declarations: [
    ModuleSortableDirective,
    Base
  ],
  imports: [
    CommonModule,
    FormsModule, 
    ReactiveFormsModule,
    NgbDropdownModule,
    NgbPaginationModule,
    NgbTypeaheadModule,
    NgxSmartModalModule.forRoot(),
    DashboardsModule,
    MatSliderModule,
    UiModule,
    IconsModule,
    ReportsModule,

    ChartModule,
   
    AdminUIModule,
    ErrorModule,
    PagesRoutingModule,

    DocumentsModule,
   
    FarmModule
  ]
})
export class PagesModule { }
