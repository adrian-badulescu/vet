import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TransferComponent } from './transfer/transfer.component';


const routes: Routes = [
    {
        path: 'transfer',
        component: TransferComponent
    },


];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TransferRoutingModule { }