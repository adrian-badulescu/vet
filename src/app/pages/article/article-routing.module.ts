
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ArticleComponent } from './article/article.component';
import { CategoriesComponent } from './categories/categories.component';
import { CustomsComponent } from './customs_declaration/customs.component';
import { AccountsComponent } from './accounts/accounts.component';



const routes: Routes = [
    {
        path: 'article',
        component: ArticleComponent
    },
    {
        path: 'categories',
        component: CategoriesComponent
    },
    {
        path: 'customs',
        component: CustomsComponent
    },
    {
        path: 'accounts',
        component: AccountsComponent
    },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ArticleRoutingModule { }
