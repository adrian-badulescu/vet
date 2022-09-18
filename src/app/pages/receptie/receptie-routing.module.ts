import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';



import { ReceptieComponent } from './receptie/receptie.component';



const routes: Routes = [
    {
        path: 'receptie',
        component: ReceptieComponent
    },


];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ReceptieRoutingModule { }
