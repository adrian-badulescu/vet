import {Component, OnInit, AfterViewInit, ElementRef, ViewChild, Input, OnChanges, SimpleChanges} from '@angular/core';
import MetisMenu from 'metismenujs/dist/metismenujs';

import { ActivatedRoute, NavigationEnd, NavigationStart, Router } from '@angular/router';
import { TabsService } from '../tabs/tabs.service';
import { TabModel } from '../tabs/tab.model';
import { CookieService } from 'src/app/core/services/cookie.service';

// import {ActivatedRoute, NavigationEnd, NavigationStart, Router} from '@angular/router';
// import {TabsService} from '../tabs/tabs.service';
// import {TabModel} from '../tabs/tab.model';
// import {AuthenticationService} from "../../core/services/auth.service";
// import {CookieService} from "../../core/services/cookie.service";


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
            title: 'Aministrare',
            children: [
 
                {
                    title: 'Buget',
                    path: '/farm/buget'
                },
                {
                    title: 'Bunuri',
                    path: '/farm/bunuri'
                },

                {
                    title: 'Inventar',
                    path: '/farm/inventar'
                },
                {
                    title: 'Utilaje',
                    path: '/farm/utilaj'
                },

            ]
        },
        {
            title: 'Raportare',
            children: [
 
                {
                    title: 'Raport de Activitati',
                    path: '/reports/activities'
                },
                {
                    title: 'Accesari aplicatie',
                    path: '/reports/user-tracker'
                },
                {
                    title: 'Nr animale/ grup',
                    path: '/reports/animal-groups'
                },


            ]
        },
        {
            title: 'Ferma animale',
            children: [

                {
                    title: 'Registru animale',
                    path: '/farm/reg'
                },
                {
                    title: 'Tratamente',
                    path: '/farm/tratamente'
                },
                {
                    title: 'Tratamente in Grup',
                    path: '/farm/tratamentegrup'
                },
                {
                    title: 'Stadii',
                    path: '/farm/stadii'
                },
                {
                    title: 'Pasunat',
                    path: '/farm/pasunat'
                }, 
                {
                    title: 'Furajare vite de carne',
                    path: '/farm/furajare'
                },                
 
                {
                    title: 'Deparazitari',
                    path: '/farm/Deparazitari'
                },

            ]
        },
        {
            title: 'Culturi Agricole',
            children: [

 
                {
                    title: 'Activitate',
                    path: '/farm/activitate'
                },
                {
                    title: 'Lot',
                    path: '/farm/lot'
                },
                {
                    title: 'Productie',
                    path: '/farm/productie'
                }

            ]
        },


    ];

    menu: any;


    @ViewChild('sideMenu', {static: false}) sideMenu: ElementRef;

    constructor(private router: Router, private tabService: TabsService, private cookieService: CookieService) {
    }

    ngOnInit() {
        // this.modules = JSON.parse(this.cookieService.getCookie('currentUser')).modules.map((module) => {
        //     return module.toLowerCase();
        // });
        const tempMenu = [];
        this.menuData.forEach((menu) => {
            if (menu.code) {
                if (this.modules.includes(menu.code.toLowerCase())) tempMenu.push(menu);
            }
            if (menu.children) {
                const childrenTemp = [];
                menu.children.forEach((submeniu) => {
                    if (submeniu['code']) {
                        if (this.modules.includes(submeniu['code'].toLowerCase())) {
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
