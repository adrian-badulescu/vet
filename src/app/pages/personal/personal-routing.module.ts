import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrganigramaComponent } from './organigrama/organigrama.component';

const routes: Routes = [
    {
        path: 'organigrama',
        component: OrganigramaComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PersonalRoutingModule { }
