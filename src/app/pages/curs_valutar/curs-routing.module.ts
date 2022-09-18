
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CursComponent } from './curs/curs.component';


const routes: Routes = [
    {
        path: 'curs',
        component: CursComponent
    },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CursRoutingModule {}
