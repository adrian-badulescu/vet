import { NgModule } from '@angular/core';
import { BrowserModule, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { GestureConfig } from '@angular/material';


import { NgxSmartModalModule } from 'ngx-smart-modal';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { TreeTableModule } from 'primeng/treetable';
import { TreeModule } from 'primeng/tree';

import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { DialogModule } from 'primeng/dialog';
import { CodeHighlighterModule } from 'primeng/codehighlighter';
import { TabViewModule } from 'primeng/tabview';

import { ContextMenuModule } from 'primeng/contextmenu'

import { FileUploadModule } from 'primeng/fileupload';

import { ErrorInterceptor } from './core/helpers/error.interceptor';
import { JwtInterceptor } from './core/helpers/jwt.interceptor';


import { LayoutsModule } from './layouts/layouts.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { PipesModule } from "./pipes/pipes.module";
import {FormsModule} from "@angular/forms";
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';






@NgModule({
  declarations: [
    AppComponent,
    
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    LayoutsModule,
    AppRoutingModule,
    
 

    

    NgxSmartModalModule.forRoot(),

    PipesModule,

    DropdownModule, TableModule, TreeTableModule, TreeModule, TabViewModule, CodeHighlighterModule, DialogModule, ButtonModule, InputTextModule, CheckboxModule,
    ContextMenuModule, FileUploadModule, ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HAMMER_GESTURE_CONFIG, useClass: GestureConfig },

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
