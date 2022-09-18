import {Component, OnInit, AfterViewInit, ElementRef, ViewChild, Input, OnChanges, SimpleChanges} from '@angular/core';
import MetisMenu from 'metismenujs/dist/metismenujs';

import { ActivatedRoute, NavigationEnd, NavigationStart, Router } from '@angular/router';
import { TabsService } from '../tabs/tabs.service';
import { TabModel } from '../tabs/tab.model';
import { CookieService } from 'src/app/core/services/cookie.service';
// =======
// import {ActivatedRoute, NavigationEnd, NavigationStart, Router} from '@angular/router';
// import {TabsService} from '../tabs/tabs.service';
// import {TabModel} from '../tabs/tab.model';
// import {AuthenticationService} from "../../core/services/auth.service";
// import {CookieService} from "../../core/services/cookie.service";
// >>>>>>> 3546520b2c33306c44ceb2a000ae6f4e0ad269ab

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, AfterViewInit, OnChanges {

    @Input() isCondensed = false;
    searchTerm = '';
    menuDataFiltered = [];
    modules = [];
    menuData = [
        {
            title: 'Dashboard',
            code: 'dashboard',
            path: '/dashboards/dashboard-1'
        },
        {
            title: 'Stocuri',
            children: [
                {
                    title: 'Articole',
                    code: 'articole',
                    path: '/article/article'
                },
                {
                    title: 'Categorii',
                    path: '/article/categories'
                },
                {
                    title: 'Lista Gestiuni',
                    path: '/inventory/inventorylist'
                },
                {
                    title: 'Lista Facturi',
                    path: '/inventory/invoices'
                },
            ]
        },
        {
            title: 'Contabilitate',
            children: [
                {
                    title: 'Plan conturi (grid)',
                    path: '/accounting/conturigrid'
                },
                {
                    title: 'Plan conturi (tree)',
                    path: '/accounting/conturitree'
                },
                {
                    title: 'Nota contabila',
                    path: '/accounting/accounting_note'
                },
                {
                    title: 'Plati-Cumparari',
                    path: '/accounting/paybuy'
                },
                {
                    title: 'Deconturi',
                    path: '/accounting/decont'
                },
                {
                    title: 'Bon Material',
                    path: '/accounting/bonmaterial'
                },
                {
                    title: 'BT Materiale',
                    path: '/accounting/btmateriale'
                },
                {
                    title: 'BT Inventar',
                    path: '/accounting/btinventar'
                },
                {
                    title: 'Aviz Expeditie',
                    path: '/accounting/avizexpeditie'
                },
                {
                    title: 'Nota Predare',
                    path: '/accounting/notapredare'
                },
                {
                    title: 'Nota Restituire',
                    path: '/accounting/notarestituire'
                },
                {
                    title: 'Cumparari',
                    path: '/accounting/buy'
                },
                {
                    title: 'Vinzari',
                    path: '/accounting/sell'
                },
                {
                    title: 'Borderou',
                    path: '/accounting/borderou'
                },
                {
                    title: 'Gestionar',
                    path: '/accounting/gestionar'
                }
            ]
        },
        {
            title: 'Rapoarte',
            children: [
                {
                    title: 'Gestiuni',
                    path: '/reports/inventory'
                },
                {
                    title: 'Print Gestiuni',
                    path: '/reports/printinventory'
                },
                {
                    title: 'Facturi',
                    path: '/reports/invoices'
                },
                {
                    title: 'Print Facturi',
                    path: '/reports/printinvoice'
                },
                {
                    title: 'Cerere oferta',
                    path: '/reports/printcerereoferta'
                },
                {
                    title: 'Oferta',
                    path: '/reports/oferta'
                },
                {
                    title: 'Task',
                    path: '/reports/task'
                },
                {
                    title: 'Parteneri-divizie',
                    path: '/reports/partnerxdivizie'
                },
                {
                    title: 'Receptie',
                    path: '/reports/receptie'
                },
                {
                    title: 'Print Table',
                    path: '/reports/printtable'
                },
                {
                    title: 'Oferte fara detalii',
                    path: '/reports/ofertefd'
                },
                {
                    title: 'Jurnal',
                    path: '/reports/jurnal'
                }
            ]
        },
        {
            title: 'Discutii',
            children: [
                {
                    title: 'Discutii',
                    path: '/discutii/app/home'
                }
            ]


        },
        {
            title: 'Stepper',
            children: [
                {
                    title: 'Stepper',
                    path: '/stepper/stepper'
                }
            ]
        },
        {
            title: 'Receptie',
            children: [
                {
                    title: 'Receptie',
                    path: '/receptie/receptie'

                },

            ]
        },
        {
            title: 'Secretariat',
            children: [
                {
                    title: 'Documente',
                    path: '/documents/filemanager'
                }
            ]
        },
        {
            title: 'Productie',
            children: [
                {
                    title: 'Tickets',
                    path: '/pm/tickets'
                },
                {
                    title: 'Proiecte',
                    path: '/pm/projects'
                },
                {
                    title: 'Calendar',
                    path: '/pm/calendar'
                },
                {
                    title: 'Contacte',
                    path: '/pm/contacts'
                },
                {
                    title: 'Opportunities',
                    path: '/pm/opportunities'
                },
                {
                    title: 'Leads',
                    path: '/pm/leads'
                },
                {
                    title: 'Customers',
                    path: '/pm/customers'
                }
            ]
        },
        {
            title: 'Personal',
            children: [
                {
                    title: 'Organigrama',
                    path: '/personal/organigrama'
                }
            ]
        },
        {
            title: 'Regularizare',
            children: [
                {
                    title: 'Regularizare',
                    path: '/regularizare/regularizare'
                }
            ]
        },
        {
            title: 'Transfer',
            children: [
                {
                    title: 'Transfer',
                    path: '/transfer/transfer'
                }
            ]
        },
        {
            title: 'Board',
            children: [
                {
                    title: 'Tabla',
                    path: '/board/board'
                }
            ]
        },
        {
            title: 'Curs valutar',
            children: [
                {
                    title: 'Curs',
                    path: '/curs/curs'
                }
            ]
        },
        {
            title: 'Vanzari',
            children: [
                {
                    title: 'Contracte',
                    path: '/vanzari/contract'
                },
                {
                    title: 'Oferta',
                    path: '/vanzari/oferta'
                },
                {
                    title: 'Oferta tip',
                    path: '/reports/ofertatip'
                }
            ]
        },
        {
            title: 'Articole',
            children: [
                {
                    title: 'Articole',
                    path: '/article/article'
                },
                {
                    title: 'Declaratii vamale',
                    path: '/article/customs'
                },
                {
                    title: 'Conturi bancare',
                    path: '/article/accounts'
                },
                {
                    title: 'Categorii',
                    path: '/article/categories'
                }
            ]
        },
        {
            title: 'Dev Module',
            children: [
                {
                    title: 'Modul Grid Default',
                    path: '/dev/modulegriddefault'
                },
                {
                    title: 'Module grid primeng',
                    path: '/dev/modulegridprimeng'
                },
                {
                    title: 'Modul grid details primeng',
                    path: '/dev/modulegriddetailsprimeng'
                },
                {
                    title: 'Modul tree primeng',
                    path: '/dev/moduletreeprimeng'
                },
                {
                    title: 'Modul tree details primeng',
                    path: '/dev/moduletreedetailsprimeng'
                },
                {
                    title: 'Page Demo',
                    path: '/dev/pagedemo'
                },
                {
                    title: 'Row Expand',
                    path: '/dev/rowexpand'
                },
                {
                    title: 'User Access',
                    path: '/dev/user-access'
                },
                {
                    title: 'Role Access',
                    path: '/dev/role-access'
                }
            ]
        },
        {
            title: 'Dev Rapoarte',
            children: [
                {
                    title: 'Grid',
                    path: '/dev/reportgridprimeng'
                },
                {
                    title: 'Rowexpand',
                    path: '/dev/reportrowexpandprimeng'
                },
                {
                    title: 'ColGroup',
                    path: '/dev/reportcolgroupprimeng'
                },
                {
                    title: 'RowGroup',
                    path: '/dev/reportrowgroupprimeng'
                },
                {
                    title: 'Charts',
                    path: '/dev/reportchartsprimeng'
                }
            ]
        },
        {
            title: 'Formula',
            children: [
                {
                    title: 'Formula',
                    path: '/formula/formula'
                },
                {
                    title: 'Aviz',
                    path: '/formula/aviz'
                },
                {
                    title: 'Bon fiscal',
                    path: '/formula/bonfiscal'
                }
            ]
        },
        {
            title: 'Proforma',
            children: [
                {
                    title: 'Factura proforma',
                    path: '/proforma/proforma'
                },
            ]
        },
        {
            title: 'BOM',
            children: [
                {
                    title: 'Bom',
                    path: '/bom/bom'
                },
            ]
        },
        {
            title: 'Foaie parcurs',
            children: [
                {
                    title: 'Foaie parcurs',
                    path: '/foaieparcurs/foaieparcurs'
                },
                {
                    title: 'Auto',
                    path: '/foaieparcurs/auto'
                },
                {
                    title: 'Partener',
                    path: '/foaieparcurs/partener'
                }


            ]
        },

    ];

    menu: any;


    @ViewChild('sideMenu', {static: false}) sideMenu: ElementRef;

    constructor(private router: Router, private tabService: TabsService, private cookieService: CookieService) {
    }

    ngOnInit() {
        this.modules = JSON.parse(this.cookieService.getCookie('currentUser')).modules.map((module) => {
            return module.toLowerCase();
        });
        const tempMenu = [];
        this.menuData.forEach((menu) => {
            if (menu.code) {
                if (this.modules.includes(menu.code.toLowerCase())) tempMenu.push(menu);
            }
            if (menu.children) {
                const childrenTemp = [];
                menu.children.forEach((submeniu) => {
                    if (submeniu.code) {
                        if (this.modules.includes(submeniu.code.toLowerCase())) {
                            childrenTemp.push(submeniu);
                            let newMenu = {title: '', children: []};
                            newMenu.title = menu.title;
                            newMenu.children = childrenTemp;
                            // menu.children = childrenTemp;
                            tempMenu.push(newMenu);
                        }
                    }
                });

            }
        });
        console.log(tempMenu);
        // this.menuData = tempMenu;
        this.menuDataFiltered = this.menuData;
        const searchterm = 'dashboard';
        this.router.events
            .subscribe((value) => {
                if (value instanceof NavigationStart) {
                    this.removeDropdown();
                }
                if (value instanceof NavigationEnd) {
                    // this.menuDataFiltered = [];
                    // this.menuDataFiltered = this.menuData;
                    // setTimeout(()=>{
                    //     this.menu.dispose();
                    //     this.menu = new MetisMenu(this.sideMenu.nativeElement);
                    this._activateMenuDropdown();
                    // });
                }
            });
    }

    filterMenu(searchterm: string) {
        if (searchterm !== '') {
            this.menuDataFiltered = this.menuData
                .filter(menu => menu.children ? menu.children.some(x => x.title.toLowerCase().includes(searchterm.toLowerCase())) || menu.title.toLowerCase().includes(searchterm.toLowerCase()) : menu.title.toLowerCase().includes(searchterm.toLowerCase()));
        } else {
            this.menuDataFiltered = this.menuData;
        }
        setTimeout(() => {
            this.menu.dispose();
            this.menu = new MetisMenu(this.sideMenu.nativeElement);
        });
    }

    // menuFilter(query):any[] {
    //     //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
    //     for(let i = 0; i < this.menuData.length; i++) {
    //         let menu = this.menuData[i];
    //         if(menu.title.toLowerCase().indexOf(query.toLowerCase()) == 0) {
    //             this.menuDataFiltered.push(menu);
    //         }
    //     }
    //     return filtered;
    // }

    ngAfterViewInit() {
        if (this.menu) {
            this.menu.dispose();
        }
        this.menu = new MetisMenu(this.sideMenu.nativeElement);
        this._activateMenuDropdown();
    }

    ngOnChanges(changes: SimpleChanges) {
        console.log(changes);
        if (!this.isCondensed && this.sideMenu || this.isCondensed) {
            setTimeout(() => {
                this.menu = new MetisMenu(this.sideMenu.nativeElement);
                this._activateMenuDropdown();
            });
        } else if (this.menu) {
            this.menu.dispose();
        }
    }

    openTab(menuItem: any) {
        const tab: TabModel = new class implements TabModel {
            path: string;
            title: string;
        };
        tab.path = menuItem.path;
        tab.title = menuItem.title;
        this.tabService.addTab(tab);
        this.router.navigateByUrl(tab.path);
    }

    /**
     * small sidebar
     */
    smallSidebar() {
        document.body.classList.add('left-side-menu-sm');
        document.body.classList.remove('left-side-menu-dark');
        document.body.classList.remove('topbar-light');
        document.body.classList.remove('boxed-layout');
        document.body.classList.remove('enlarged');
    }

    /**
     * Dark sidebar
     */
    darkSidebar() {
        document.body.classList.remove('left-side-menu-sm');
        document.body.classList.add('left-side-menu-dark');
        document.body.classList.remove('topbar-light');
        document.body.classList.remove('boxed-layout');
    }

    /**
     * Light Topbar
     */
    lightTopbar() {
        document.body.classList.add('topbar-light');
        document.body.classList.remove('left-side-menu-dark');
        document.body.classList.remove('left-side-menu-sm');
        document.body.classList.remove('boxed-layout');

    }

    /**
     * Sidebar collapsed
     */
    sidebarCollapsed() {
        document.body.classList.remove('left-side-menu-dark');
        document.body.classList.remove('left-side-menu-sm');
        document.body.classList.toggle('enlarged');
        document.body.classList.remove('boxed-layout');
        document.body.classList.remove('topbar-light');
    }

    /**
     * Boxed Layout
     */
    boxedLayout() {
        document.body.classList.add('boxed-layout');
        document.body.classList.remove('left-side-menu-dark');
        document.body.classList.add('enlarged');
        document.body.classList.remove('left-side-menu-sm');
    }

    /**
     * Activates the menu dropdown
     */
    _activateMenuDropdown() {
        const links = document.getElementsByClassName('side-nav-link-ref');
        let menuItemEl = null;
        // tslint:disable-next-line: prefer-for-of
        for (let i = 0; i < links.length; i++) {
            // tslint:disable-next-line: no-string-literal
            if (window.location.pathname === links[i]['pathname']) {
                menuItemEl = links[i];
                console.log(menuItemEl);
                break;
            }
        }

        if (menuItemEl) {
            menuItemEl.classList.add('active');

            const parentEl = menuItemEl.parentElement;
            if (parentEl) {
                parentEl.classList.add('active');

                const parent2El = parentEl.parentElement;
                if (parent2El) {
                    parent2El.classList.add('in');
                }

                const parent3El = parent2El.parentElement;
                if (parent3El) {
                    console.log(parent3El);
                    parent3El.classList.add('active');
                    parent3El.firstChild.classList.add('active');
                }
            }
        }
    }

    removeDropdown() {
        const links = document.getElementsByClassName('side-nav-link-ref');
        let menuItemEl = null;
        // tslint:disable-next-line: prefer-for-of
        for (let i = 0; i < links.length; i++) {
            // tslint:disable-next-line: no-string-literal
            if (window.location.pathname === links[i]['pathname']) {
                menuItemEl = links[i];
                break;
            }
        }

        if (menuItemEl) {
            menuItemEl.classList.remove('active');

            const parentEl = menuItemEl.parentElement;
            if (parentEl) {
                parentEl.classList.remove('active');

                const parent2El = parentEl.parentElement;
                if (parent2El) {
                    parent2El.classList.remove('in');
                }

                const parent3El = parent2El.parentElement;
                if (parent3El) {
                    parent3El.classList.remove('active');
                    parent3El.firstChild.classList.remove('active');
                }
            }
        }
    }

}
