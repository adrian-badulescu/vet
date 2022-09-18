

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbPaginationModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxSmartModalModule } from 'ngx-smart-modal';

import { DashboardsModule } from './dashboards/dashboards.module';

import { ExtrasModule } from './extras/extras.module';
import { UiModule } from './ui/ui.module';
import { IconsModule } from './icons/icons.module';
import { ChartModule } from './chart/chart.module';
import { ErrorModule } from './error/error.module';

import { InventoryModule } from './inventory/inventory.module';
import { ReportsModule } from './reports/reports.module';
import { DocumentsModule } from './documents/documents.module';
import { PMModule } from './pm/pm.module';
import { PersonalModule } from './personal/personal.module';
import { DevModule } from './_dev/dev.module';
import { VanzariModule } from './vanzari/vanzari.module';
import { AccountingModule } from './accounting/accounting.module';
import { PagesRoutingModule } from './pages-routing.module';
import { CompanyModule } from './company/company.module';
import { ComandaModule } from './comanda/comanda.module';
import { CursModule } from './curs_valutar/curs.module';
import { ArticleModule } from './article/article.module';
import { FormulaModule } from './formula/formula.module';
import { ProformaModule } from './proforma/proforma.module';
import { ReceptieModule } from './receptie/receptie.module';
import { Base } from './_ewo/base';
import { ModuleSortableDirective } from './_ewo/base/module-sortable.directive';
import { ModuleComponent } from './_ewo/base/module/module';
import { SortableModule } from 'ngx-bootstrap';


@NgModule({
  declarations: [
    Base,    
    ModuleSortableDirective
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
    ExtrasModule,
    UiModule,
    IconsModule,
    ChartModule,
    ErrorModule,
    PagesRoutingModule,
    InventoryModule,
    ReportsModule,
    DocumentsModule,
    PMModule,
    PersonalModule,
    DevModule,
    VanzariModule,
    AccountingModule,
    CompanyModule,
    ComandaModule,
    CursModule,
    ArticleModule,
    FormulaModule,
    ProformaModule,
    ReceptieModule,
  ],
  exports: [],
  providers: []

})
export class PagesModule { }
