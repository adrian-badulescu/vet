import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ModuleComponent } from '../_ewo/base/module/module';

import { ContractComponent } from './contract/contract';
import { OfertaComponent } from './oferta/oferta';

const routes: Routes = [
    {
        path: 'contract',
        component: ContractComponent
    },
    {
        path: 'oferta',
        component: OfertaComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class VanzariRoutingModule {}
