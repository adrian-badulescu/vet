import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PageDemoComponent } from './pagedemo/pagedemo.component';
import { ModuleGridDefaultComponent } from './module_griddefault/moduledemo.component'; 
import { ModuleGridPrimengComponent } from './module_gridprimeng/moduledemo.component'; 
import { ModuleGridDetailsPrimengComponent } from './module_gridprimeng_details/moduledemo.component'; 
import { ModuleTreeDetailsPrimengComponent } from './module_treeprimeng_details/moduledemo.component'; 
import { ModuleTreePrimengComponent } from './module_treeprimeng/moduledemo.component'; 
import { UboldComponent } from './ubold/ubold.component'; 

import { ReportGridPrimengComponent } from './report_gridprimeng/reportdemo.component'; 
import { ReportRowExpandPrimengComponent } from './report_rowexpandprimeng/reportdemo.component'; 
import { ReportColGroupPrimengComponent } from './report_colgroupprimeng/reportdemo.component'; 
import { ReportRowGroupPrimengComponent } from './report_rowgroupprimeng/reportdemo.component'; 

import {UserAccessComponent} from "./user-access/user-access.component";
import {RoleAccessComponent} from "./role-access/role-access.component";

const routes: Routes = [
    {
        path: 'ubold',
        component: UboldComponent
    },
    {
        path: 'pagedemo',
        component: PageDemoComponent
    },
    {
        path: 'modulegriddefault',
        component: ModuleGridDefaultComponent
    },
    {
        path: 'modulegridprimeng',
        component: ModuleGridPrimengComponent
    },
    {
        path: 'modulegriddetailsprimeng',
        component: ModuleGridDetailsPrimengComponent
    },
    {
        path: 'moduletreeprimeng',
        component: ModuleTreePrimengComponent
    },
    {
        path: 'moduletreedetailsprimeng',
        component: ModuleTreeDetailsPrimengComponent
    },
    {
        path: 'reportgridprimeng',
        component: ReportGridPrimengComponent
    },
    {
        path: 'reportrowexpandprimeng',
        component: ReportRowExpandPrimengComponent
    },
    {
        path: 'reportcolgroupprimeng',
        component: ReportColGroupPrimengComponent
    },
    {
        path: 'reportrowgroupprimeng',
        component: ReportRowGroupPrimengComponent
    },
    {
        path: 'user-access',
        component: UserAccessComponent,
    },
    {
        path: 'role-access',
        component: RoleAccessComponent,
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DevRoutingModule { }
