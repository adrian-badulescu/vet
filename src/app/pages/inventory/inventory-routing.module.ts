
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InventoryListComponent } from './inventorylist/inventorylist.component';
import { InvoicesComponent } from './invoices/invoices.component';

const routes: Routes = [
    {
        path: 'inventorylist',
        component: InventoryListComponent
    },
    {
        path: 'invoices',
        component: InvoicesComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CRMRoutingModule {}
