
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TicketsComponent } from './tickets/tickets.component';
import { ProjectsComponent } from './projects/projects.component';
import { CalendarComponent } from './calendar/calendar.component';

import { ContactsComponent } from './contacts/contacts.component';
import { CustomersComponent } from './customers/customers.component';
import { LeadsComponent } from './leads/leads.component';
import { OpportunitiesComponent } from './opportunities/opportunities.component';
import { ResourceComponent } from './resource/resource.component';

const routes: Routes = [
    {
        path: 'tickets',
        component: TicketsComponent
    },
    {
        path: 'projects',
        component: ProjectsComponent
    },
    {
        path: 'calendar',
        component: CalendarComponent
    },
    {
        path: 'contacts',
        component: ContactsComponent
    },
    {
        path: 'customers',
        component: CustomersComponent
    },
    {
        path: 'leads',
        component: LeadsComponent
    },
    {
        path: 'opportunities',
        component: OpportunitiesComponent
    },
    {
        path: 'resources',
        component: ResourceComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PMRoutingModule {}
