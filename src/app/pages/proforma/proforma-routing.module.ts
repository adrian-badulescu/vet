import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProformaComponent } from './proforma.component';


const routes: Routes = [
    {
        path: 'proforma',
        component: ProformaComponent
    },


];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProformaRoutingModule { }
