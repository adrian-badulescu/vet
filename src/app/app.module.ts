

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { NgxSmartModalModule } from 'ngx-smart-modal';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
// import { FakeDbService } from './fake-data/_fake_data.service';


// import {environment} from 'src/environments/environment';
// import { AngularFirestoreModule } from 'angularfire2/firestore';
// import { AngularFireModule } from 'angularfire2';
// import { AngularFireDatabaseModule } from 'angularfire2/database';
// import { AngularFireAuthModule } from 'angularfire2/auth';

//import {CalendarModule} from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { TreeTableModule } from 'primeng/treetable';
import { TreeModule } from 'primeng/tree';
import { TreeNode } from 'primeng/api';
//import {DataTableModule} from 'primeng/datatable';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { DialogModule } from 'primeng/dialog';
import { CodeHighlighterModule } from 'primeng/codehighlighter';
import { TabViewModule } from 'primeng/tabview';
/*import {TabPanel} from 'primeng/tabpanel';*/
/*import {Column} from 'primeng/column';*/
import { ContextMenuModule } from 'primeng/contextmenu'
/*import {MenuItem, Header, Footer} from 'primeng/components/common/api';*/
// import {EditorModule} from 'primeng/editor';
import { FileUploadModule } from 'primeng/fileupload';

import { ErrorInterceptor } from './core/helpers/error.interceptor';
import { JwtInterceptor } from './core/helpers/jwt.interceptor';
import { FakeBackendProvider } from './core/helpers/fake-backend';

import { LayoutsModule } from './layouts/layouts.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { PipesModule } from "./pipes/pipes.module";
import {FormsModule} from "@angular/forms";
import { ModuleComponent } from './pages/_ewo/base/module/module';


@NgModule({
  declarations: [
    AppComponent,
    ModuleComponent,
       
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    LayoutsModule,
    AppRoutingModule,

    

    NgxSmartModalModule.forRoot(),
    // InMemoryWebApiModule.forRoot(FakeDbService),

    PipesModule,

    // AngularFireModule.initializeApp(environment.firebase, 'angular-auth-firebase'),
    // AngularFirestoreModule,
    // AngularFireDatabaseModule,
    // AngularFireAuthModule,  

    //CalendarModule, DataTableModule, EditorModule
    DropdownModule, TableModule, TreeTableModule, TreeModule, TabViewModule, CodeHighlighterModule, DialogModule, ButtonModule, InputTextModule, CheckboxModule,
    ContextMenuModule, FileUploadModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },   

    // provider used to create fake backend
    // FakeBackendProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
