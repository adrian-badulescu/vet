import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { FoaieParcursComponent } from './module_foaieparcurs/foaieparcurs.component';
import { AutoComponent } from './auto/auto.component';
import { PartenerComponent } from './partener/partener.component';


const routes: Routes = [
    {
        path: 'foaieparcurs',
        component: FoaieParcursComponent
    },
    {
        path: 'auto',
        component: AutoComponent
    },
    {
        path: 'partener',
        component: PartenerComponent
    },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DevRoutingModule { }
