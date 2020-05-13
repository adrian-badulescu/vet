
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ActivitateComponent } from './activitate/activitate.component';
import { BugetComponent } from './buget/buget.component';
import { BunuriComponent } from './bunuri/bunuri.component';
import { LotComponent } from './lot/lot.component';
import { ImprumutComponent } from './imprumut/imprumut.component';
import { InventarComponent } from './inventar/inventar.component';
import { UtilajComponent } from './utilaj/utilaj.component';
import { CheltuialaObiectComponent } from './cheltuiala_obiect/cheltuiala_obiect.component';
import { ProductieComponent } from './productie/productie.component';
import { VaccinariComponent } from './vaccinari/vaccinari.component';
import { TratamenteComponent } from './tratamente/tratamente.component';
import { TratamenteGrpComponent } from './tratamente_grup/tratamente_grup.component';
import { DeparazitariComponent } from './deparazitari/deparazitari.component';
import { RegComponent } from './reg_animals/reg.component';
import { StagesComponent } from './stadii/stages.component';
import { PasunatComponent } from './pasunat/pasunat.component';
import { FurajareComponent } from './furajare_beef/furajare.component';



const routes: Routes = [
    {
        path: 'tratamentegrup',
        component: TratamenteGrpComponent
    },
    {
        path: 'reg',
        component: RegComponent
    },
    {
        path: 'vaccinari',
        component: VaccinariComponent
    },
    {
        path: 'tratamente',
        component: TratamenteComponent
    },
    {
        path: 'pasunat',
        component: PasunatComponent
    },
    {
        path: 'furajare',
        component: FurajareComponent
    },
    {
        path: 'deparazitari',
        component: DeparazitariComponent
    },
    {
        path: 'activitate',
        component: ActivitateComponent
    },
    {
        path: 'buget',
        component: BugetComponent
    },
    {
        path: 'bunuri',
        component: BunuriComponent
    },
    {
        path: 'lot',
        component: LotComponent
    },
    {
        path: 'imprumut',
        component: ImprumutComponent
    },
    {
        path: 'inventar',
        component: InventarComponent
    },
    {
        path: 'utilaj',
        component: UtilajComponent
    },
    {
        path: 'cheltuieli',
        component: CheltuialaObiectComponent
    },
    {
        path: 'productie',
        component: ProductieComponent
    },
    {
        path: 'stadii',
        component: StagesComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class FarmRoutingModule { }
