
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FirmaComponent } from './firma/firma.component';
import { AdminaliasComponent } from './admin_alias/adminalias.component';


const routes: Routes = [
    {
        path: 'firma',
        component: FirmaComponent
    },
    {
        path: 'adminalias',
        component: AdminaliasComponent
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CompanyRoutingModule {}
