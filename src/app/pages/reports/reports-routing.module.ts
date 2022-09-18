

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReportComponent } from '../_ewo/base/report/report';
import { ModuleComponent } from '../_ewo/base/module/module';

import { InventoryComponent } from './inventory/inventory.component';

import { PrintinventoryComponent } from './printinventory/printinventory.component';

import { InvoicesComponent } from './invoices/invoices.component';


import { PrintinvoiceComponent } from './printinvoice/printinvoice.component';
import { PrintcerereofertaComponent } from './printcerereoferta/printcerereoferta.component';
import { CerereOfertaComponent } from './cerereoferta/cerereoferta.component';

import { TaskComponent } from './task/task.component';
import { PartnerxdivizieComponent } from './partnerxdivizie/partnerxdivizie.component';
import { ReceptieComponent } from './receptie/receptie.component'
import { PrintTableComponent } from './printtable/printtable.component'
import { GanttComponent } from './gantt/gantt.component';

//accounting
import { JurnalComponent } from './jurnal/jurnal.component';

const routes: Routes = [
    {
        path: 'inventory',
        component: InventoryComponent
    },
    {
        path: 'invoices',
        component: InvoicesComponent
    },
    {
        path: 'printcerereoferta',
        component: PrintcerereofertaComponent
    },
    {
        path: 'printinvoice',
        component: PrintinvoiceComponent
    },
    {
        path: 'invoices',
        component: InvoicesComponent
    },
    {
        path: 'oferta',
        component: CerereOfertaComponent
    },
    {
        path: 'ofertefd',
        component: ReportComponent,
        data: {
            entity: 'invoices',
            title: 'Lista oferte fara detalii',
            print: false
        },
    },
    {
        path: 'ofertatip',
        component: ModuleComponent,
        data: {
            entity: 'invoices',
            title: 'Facturi',
            print: false
        },
    },
    {
        path: 'task',
        component: TaskComponent
    },
    {
        path: 'partnerxdivizie',
        component: PartnerxdivizieComponent
    },
    {
        path: 'receptie',
        component: ReceptieComponent
    },
    {
        path: 'printinventory',
        component: PrintinventoryComponent
    },
    {
        path: 'printtable',
        component: PrintTableComponent

    },
    {
        path: 'gantt',
        component: GanttComponent
    },
    {
        path: 'jurnal',
        component: JurnalComponent
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ReportsRoutingModule { }
