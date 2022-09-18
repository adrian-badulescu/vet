import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegularizareComponent } from './regularizare/regularizare.component';


const routes: Routes = [
    {
        path: 'regularizare',
        component: RegularizareComponent
    },


];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RegularizareRoutingModule { }