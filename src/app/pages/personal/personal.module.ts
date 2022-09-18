import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgbPaginationModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';

import { UIModule } from '../../shared/ui/ui.module';
import { NgxSmartModalModule } from 'ngx-smart-modal';

import {OrganizationChartModule} from 'primeng/organizationchart';
import {TreeNode} from 'primeng/api';

import { PersonalRoutingModule } from './personal-routing.module';

import { OrganigramaComponent } from './organigrama/organigrama.component';


@NgModule({   
  declarations: [OrganigramaComponent],

  imports: [
    CommonModule,
    UIModule,
    PersonalRoutingModule,    
    FormsModule,
    ReactiveFormsModule,
    NgbPaginationModule,
    NgbTypeaheadModule,
    NgxSmartModalModule.forRoot(),

    OrganizationChartModule
  ],
 
})
export class PersonalModule { }
