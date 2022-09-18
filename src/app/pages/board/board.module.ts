
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardComponent } from './board.component';
import {
  NgbDropdownModule, NgbModalModule, NgbPaginationModule,
  NgbTypeaheadModule, NgbProgressbarModule, NgbTooltipModule
} from '@ng-bootstrap/ng-bootstrap';
import { UIModule } from 'src/app/shared/ui/ui.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DndModule } from 'ngx-drag-drop';
import { NgApexchartsModule } from 'ng-apexcharts';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { HttpClientModule } from '@angular/common/http';
import { BoardRoutingModule } from './board-routing.module';
// import { ModalModule } from 'ngb-modal';

import { NgxSmartModalModule } from 'ngx-smart-modal';



@NgModule({
  declarations: [BoardComponent],
  imports: [
    CommonModule,
    BoardRoutingModule,
    NgbDropdownModule,
    UIModule,
    FormsModule,
    DndModule,
    NgbModalModule,
    NgbPaginationModule,
    ReactiveFormsModule,
    NgApexchartsModule,    
    Ng2SearchPipeModule,
    HttpClientModule,
    NgbTypeaheadModule,
    NgbProgressbarModule,
    NgbTooltipModule,
    // ModalModule,
    NgxSmartModalModule
  ]
})
export class BoardModule { }
