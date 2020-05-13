import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// import { FileManagerComponent } from './filemanager/filemanager';
// import { RegisterComponent } from './register/register.component';

const routes: Routes = [
    // {
    //     path: 'filemanager',
    //     component: FileManagerComponent
    // },
    // {
    //     path: 'register',
    //     component: RegisterComponent
    // }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DocumentsRoutingModule {}
