import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BuyComponent } from './buy/buy.component';
import { SellComponent } from './sell/sell.component';
import { ConturiGridComponent } from './conturi_grid/conturi.component';
import { ConturiTreeComponent } from './conturi_tree/conturi.component';
import { AccountingnoteComponent } from './accounting_note/accountingnote.component';
import { BonmaterialComponent } from './bonmaterial/bonmaterial.component';
import { NotarestituireComponent } from './notarestituire/notarestituire.component';
import { BtmaterialeComponent } from './btmateriale/btmateriale.component';
import { BtinventarComponent } from './btinventar/btinventar.component';
import { AvizexpeditieComponent } from './avizexpeditie/avizexpeditie.component';
import { NotapredareComponent } from './notapredare/notapredare.component';
import { PaybuyComponent } from './paybuy/paybuy.component';
import { DecontComponent } from './deconturi/decont.component';
import { BorderouComponent } from './borderou/borderou.component';
import { GestionarComponent } from './gestionar/gestionar.component';

const routes: Routes = [
    {
        path: 'buy',
        component: BuyComponent
    },
    {
        path: 'sell',
        component: SellComponent
    },
    {
        path: 'paybuy',
        component: PaybuyComponent
    },
    {
        path: 'decont',
        component: DecontComponent
    },
    {
        path: 'conturigrid',
        component: ConturiGridComponent
    },
    {
        path: 'conturitree',
        component: ConturiTreeComponent
    },
    {
        path: 'accounting_note',
        component: AccountingnoteComponent
    },
    {
        path: 'bonmaterial',
        component: BonmaterialComponent
    },
    {
        path: 'notarestituire',
        component: NotarestituireComponent
    },
    {
        path: 'notapredare',
        component: NotapredareComponent
    },
    {
        path: 'btmateriale',
        component: BtmaterialeComponent
    },
    {
        path: 'btinventar',
        component: BtinventarComponent
    },
    {
        path: 'avizexpeditie',
        component: AvizexpeditieComponent
    },
    {
        path: 'borderou',
        component: BorderouComponent
    },
    {
        path: 'gestionar',
        component: GestionarComponent
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AccountingRoutingModule { }
