
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormulaComponent } from './formula/formula.component';
import { AvizComponent } from './aviz/aviz.component';
import { BonFiscalComponent } from './bon_fiscal/bon_fiscal.component';


const routes: Routes = [
    {
        path: 'formula',
        component: FormulaComponent
    },
    {
        path: 'aviz',
        component: AvizComponent
    },
    {
        path: 'bonfiscal',
        component: BonFiscalComponent
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class FormulaRoutingModule { }
