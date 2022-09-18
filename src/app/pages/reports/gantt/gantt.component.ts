import { Component, ViewChild } from '@angular/core';
import { GanttEditorComponent, GanttEditorOptions } from 'ng-gantt';

// import { ModuleService } from './../../_services/module.service';


@Component({
  selector: 'gantt',
  // template: '<ng-gantt [options]="editorOptions" [data]="data"></ng-gantt>',
  templateUrl: './gantt.component.html',
  styleUrls: ['./gantt.component.scss'],
  
})
export class GanttComponent {

  public editorOptions: GanttEditorOptions;
  public data: any;
  @ViewChild(GanttEditorComponent, { static: true }) editor: GanttEditorComponent;
  
  constructor() {
    this.editorOptions = new GanttEditorOptions()
     this.data = [{
      'pID': 1,
      'pName': 'Define Chart API',
      'pStart': '',
      'pEnd': '',
      'pClass': 'ggroupblack',
      'pLink': '',
      'pMile': 0,
      'pRes': 'Brian',
      'pComp': 0,
      'pGroup': 1,
      'pParent': 0,
      'pOpen': 1,
      'pDepend': '',
      'pCaption': '',
      'pNotes': 'Some Notes text'
    }]; 
  }









}
