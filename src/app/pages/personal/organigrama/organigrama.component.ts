import { Component, OnInit, Input } from '@angular/core';
import {TreeNode} from 'primeng/api';

@Component({
  selector: 'organigrama',
  templateUrl: './organigrama.component.html',
  styleUrls: ['./organigrama.component.scss']
})

/**
 * Invoice component - handling the invoice with sidebar and content
 */
export class OrganigramaComponent implements OnInit {
  objectkeys = Object.keys;
  // bread crumb data
  breadCrumbItems: Array<{}>;

  @Input()
  dataToPrint: Array<any> = [];
  
  @Input()
  tableHeaders: Array<string> = [];

  data: TreeNode[];

  constructor() { }

  ngOnInit() {
    this.breadCrumbItems = [{ label: 'Dashboard', path: '/' }, { label: 'Personal', path: '/' }, { label: 'Organigrama', path: '/', active: true }];

    this.data = [{
      label: 'Root',
      children: [
          {
              label: 'Child 1',
              children: [
                  {
                      label: 'Grandchild 1.1'
                  },
                  {
                      label: 'Grandchild 1.2'
                  }
              ]
          },
          {
              label: 'Child 2',
              children: [
                  {
                      label: 'Child 2.1'
                  },
                  {
                      label: 'Child 2.2'
                  }
              ]
          }
      ]
  }];
    
  }

}
