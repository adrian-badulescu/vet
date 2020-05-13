import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ActivityReportComponent } from './activity/activity.component';
import { UserTrackerComponent } from './user-tracker/user-tracker.component';
import { AnimalGroupsComponent } from './animal-groups/animal-groups.component';

const routes: Routes = [
    {
        path: 'activities',
        component: ActivityReportComponent
    },
    {
        path: 'user-tracker',
        component: UserTrackerComponent
    },
    {
        path: 'animal-groups',
        component: AnimalGroupsComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ReportsRoutingModule {}
