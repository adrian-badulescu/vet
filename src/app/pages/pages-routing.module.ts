import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path: '', redirectTo: '/dashboards/dashboard-1', pathMatch: 'full'},
  { path: 'dashboards', loadChildren: () => import('./dashboards/dashboards.module').then(m => m.DashboardsModule) },
  { path: 'extras', loadChildren: () => import('./extras/extras.module').then(m => m.ExtrasModule) },
  { path: 'ui', loadChildren: () => import('./ui/ui.module').then(m => m.UiModule) },
  { path: 'icons', loadChildren: () => import('./icons/icons.module').then(m => m.IconsModule) },
  { path: 'chart', loadChildren: () => import('./chart/chart.module').then(m => m.ChartModule) },
  { path: 'error', loadChildren: () => import('./error/error.module').then(m => m.ErrorModule) }, 
  { path: 'reports', loadChildren: () => import('./reports/reports.module').then(m => m.ReportsModule) },
  { path: 'inventory', loadChildren: () => import('./inventory/inventory.module').then(m => m.InventoryModule) },
  { path: 'documents', loadChildren: () => import('./documents/documents.module').then(m => m.DocumentsModule) },
  { path: 'pm', loadChildren: () => import('./pm/pm.module').then(m => m.PMModule) },
  { path: 'personal', loadChildren: () => import('./personal/personal.module').then(m => m.PersonalModule) },
  { path: 'dev', loadChildren: () => import('./_dev/dev.module').then(m => m.DevModule) },
  { path: 'vanzari', loadChildren: () => import('./vanzari/vanzari.module').then(m => m.VanzariModule) },
  { path: 'accounting', loadChildren: () => import('./accounting/accounting.module').then(m => m.AccountingModule) },
  { path: 'company', loadChildren: () => import('./company/company.module').then(m => m.CompanyModule) },
  { path: 'comanda', loadChildren: () => import('./comanda/comanda.module').then(m => m.ComandaModule) },
  { path: 'curs', loadChildren: () => import('./curs_valutar/curs.module').then(m => m.CursModule) },  
  { path: 'article', loadChildren: () => import('./article/article.module').then(m => m.ArticleModule) },
  { path: 'formula', loadChildren: () => import('./formula/formula.module').then(m => m.FormulaModule) },
  { path: 'foaieparcurs', loadChildren: () => import('./foaie_parcurs/foaieparcurs.module').then(m => m.FoaieParcursModule) },
  { path: 'bom', loadChildren: () => import('./bom/bom.module').then(m => m.BomModule) },
  { path: 'proforma', loadChildren: () => import('./proforma/proforma.module').then(m => m.ProformaModule) },
  { path: 'stepper', loadChildren: () => import('./stepper/stepper.module').then(m => m.StepperModule) },
  { path: 'board', loadChildren: () => import('./board/board.module').then(m => m.BoardModule) },
  { path: 'regularizare', loadChildren: () => import('./regularizare/regularizare.module').then(m => m.RegularizareModule) },
  { path: 'transfer', loadChildren: () => import('./transfer/transfer.module').then(m => m.TransferModule) },
  { path: 'receptie', loadChildren: () => import('./receptie/receptie.module').then(m => m.ReceptieModule) },
  

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
