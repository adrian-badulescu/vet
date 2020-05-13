import {Injectable} from '@angular/core';
import {TabModel} from './tab.model';
import {Router} from "@angular/router";

@Injectable({
    providedIn: 'root'
})
export class TabsService {
    tabs: TabModel[] = [];
    tabOptions = [];
    constructor(private router: Router) {
        this.tabs.push(<TabModel>{path: '/dashboards/dashboard-1', title: 'Dasbhoard'});
        // router.navigate(['/dashboards/dashboard-1']);
    }

    addTab(tab) {
        if (!this.tabs.some((t) => t.path === tab.path)) {
            this.tabs.push(tab);
        }
    }

    getTabOptionByUrl(menu: Array<TabModel>, url: string): TabModel {
        return menu.find(tab => tab.path === url);
    }

    deleteTab(index: number) {
        this.tabs.splice(index, 1);
    }
}
