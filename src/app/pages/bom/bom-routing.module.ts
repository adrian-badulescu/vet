import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BomComponent } from './bom.component';


const routes: Routes = [
    {
        path: 'bom',
        component: BomComponent
    },


];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class BOMRoutingModule { }