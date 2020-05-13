import { NgModule } from "@angular/core";
import { CommonModule, DecimalPipe } from "@angular/common";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { ActivitateComponent } from "./activitate/activitate.component";
import { MatFormFieldModule, MatInputModule } from "@angular/material";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { BugetComponent } from "./buget/buget.component";
import { BunuriComponent } from "./bunuri/bunuri.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import {
  NgbPaginationModule,
  NgbTypeaheadModule
} from "@ng-bootstrap/ng-bootstrap";
import { NgxSmartModalModule } from "ngx-smart-modal";
import { AlertModule, TabsModule } from "ngx-bootstrap";
import { DropdownModule } from "primeng/dropdown";
import { TableModule } from "primeng/table";
import { TreeTableModule } from "primeng/treetable";
import { TreeModule } from "primeng/tree";
import { TabViewModule } from "primeng/tabview";
import { CodeHighlighterModule } from "primeng/codehighlighter";
import { DialogModule } from "primeng/dialog";
import { ButtonModule } from "primeng/button";
import { InputTextModule } from "primeng/inputtext";
import { CheckboxModule } from "primeng/checkbox";
import { ContextMenuModule } from "primeng/contextmenu";
import { FileUploadModule } from "primeng/fileupload";
import { ActionsModule } from "../_ewo/actions";
import { PickListModule } from "primeng/picklist";
import { AdminGridModule } from "../_ewo/admin/admingrid";
import { AdminPropertiesModule } from "../_ewo/admin/adminprop";
import { UIModule } from "src/app/shared/ui/ui.module";
import { ModuleSortableDirective } from "./module-sortable.directive";
import { FarmRoutingModule } from "./farm-routing.module";
import { LotComponent } from "./lot/lot.component";
import { ImprumutComponent } from "./imprumut/imprumut.component";
import { InventarComponent } from "./inventar/inventar.component";
import { UtilajComponent } from "./utilaj/utilaj.component";
import { CheltuialaObiectComponent } from "./cheltuiala_obiect/cheltuiala_obiect.component";
import { ProductieComponent } from "./productie/productie.component";
import { NgApexchartsModule } from "ng-apexcharts";
import { SeriesPipe } from "./series.pipe";
import { VaccinariComponent } from "./vaccinari/vaccinari.component";
import { TratamenteComponent } from "./tratamente/tratamente.component";
import { TratamenteGrpComponent } from './tratamente_grup/tratamente_grup.component';
import { DeparazitariComponent } from "./deparazitari/deparazitari.component";

import { QRCodeModule } from "angularx-qrcode";
import { RegComponent } from "./reg_animals/reg.component";
import { StagesComponent } from "./stadii/stages.component";
import { MatSliderModule } from "@angular/material/slider";
import { MatCardModule } from "@angular/material/card";
import { PasunatComponent } from "./pasunat/pasunat.component";
import { FurajareComponent } from "./furajare_beef/furajare.component";
import { CalcAgeService } from "./calc-age.service";
import { AgePipe } from "./age.pipe";
import { ResponseOnPostInterceptor } from "../../core/helpers/error.interceptor.on.post";
import { BooleanPipe } from './boolean.pipe';


@NgModule({
  declarations: [    
    AgePipe,
    StagesComponent,    
    RegComponent,
    TratamenteComponent,
    ActivitateComponent,
    VaccinariComponent,
    DeparazitariComponent,
    BugetComponent,
    BunuriComponent,
    UtilajComponent,
    ProductieComponent,    
    LotComponent,
    ImprumutComponent,
    InventarComponent,
    BooleanPipe,
    SeriesPipe,
    CheltuialaObiectComponent,
    ModuleSortableDirective,
    PasunatComponent,
    FurajareComponent,
    TratamenteGrpComponent
  ],
  imports: [
    CommonModule,
    FarmRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbPaginationModule,
    NgbTypeaheadModule,
    NgApexchartsModule,
    QRCodeModule,
    MatSliderModule,
    MatCardModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,

    NgxSmartModalModule.forRoot(),
    AlertModule.forRoot(),
    TabsModule.forRoot(),
    UIModule,

    DropdownModule,
    TableModule,
    TreeTableModule,
    TreeModule,
    TabViewModule,
    CodeHighlighterModule,
    DialogModule,
    ButtonModule,
    InputTextModule,
    CheckboxModule,
    ContextMenuModule,
    FileUploadModule,
    ActionsModule,
    PickListModule,
    AdminGridModule,
    AdminPropertiesModule
  ],
  providers: [
    DecimalPipe,
    BooleanPipe,
    CalcAgeService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ResponseOnPostInterceptor,
      multi: true
    }
  ]
})
export class FarmModule {}
