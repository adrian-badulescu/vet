import {Component, OnInit, ElementRef, OnDestroy} from '@angular/core';

import { Widget, UserBalance, RevenueData, ChartType } from './default.model';
import { widgetData, salesMixedChart, revenueRadialChart, userBalanceData, revenueData } from './data';
import {PageChangedEvent} from "ngx-bootstrap";
import {RouterService} from "../../../core/services/router.service";

@Component({
  selector: 'app-default-dashboard',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss'],
})

/**
 * Dashboard-1 component: handling the dashboard-1 with sidebar and content
 */
export class DefaultDashboardComponent implements OnInit, OnDestroy {

  // bread crumb items
  breadCrumbItems: Array<{}>;

  widgetData: Widget[];
  userBalanceData: UserBalance[];
  revenueData: RevenueData[];
  salesMixedChart: ChartType;
  revenueRadialChart: ChartType;
  currentDate = new Date();
  constructor(private eref: ElementRef, private routerService: RouterService) { }

  ngOnInit() {
    this.breadCrumbItems = [{ label: 'UBold', path: '/' }, { label: 'Dashboard', path: '/', active: true }];

    /**
     * fetches data
     */
    this._fetchData();
  }

  /**
   * fetches the dashboard value
   */
  private _fetchData() {

    this.widgetData = widgetData;
    this.salesMixedChart = salesMixedChart;
    this.revenueRadialChart = revenueRadialChart;
    this.userBalanceData = userBalanceData;
    this.revenueData = revenueData;
  }

  ngOnDestroy(): void {
    console.log('am parasit dashboard-ul')
  }
}
