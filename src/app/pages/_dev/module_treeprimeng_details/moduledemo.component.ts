import {Component,OnInit} from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import {Base} from '../../_ewo/base';
import {EwoColumn, EwoProperty} from '../../_ewo/model/model';
import {SelectItem, LazyLoadEvent, FilterMetadata} from 'primeng/components/common/api';
import {TreeNode} from 'primeng/api';

import {BaseService as EwoService} from '../../_ewo/service/service';

import {Category, CategoryxArticles} from './moduledemo.model';
import {ModuleDemoService} from './moduledemo.service';
import {BaseService} from './../../_services/base.service';

@Component({
    templateUrl: 'moduledemo.component.html',
    providers: [EwoService,BaseService,ModuleDemoService]
})
export class ModuleTreeDetailsPrimengComponent extends Base implements OnInit {

    breadCrumbItems: Array<{}>;

    list:TreeNode[];
    columns: any[];
    item:Category;
    selectedItems:TreeNode[];
    value: Date;

    article: CategoryxArticles;
    article_org: CategoryxArticles;
    categoryxarticles: Array<CategoryxArticles> = [];
    categoryxarticles_deleted: Array<CategoryxArticles> = [];

    listpartner:SelectItem[];
    validationform: FormGroup;
    submitted: boolean;
    loading: boolean;

    constructor(private serviceBase1:EwoService, private service:BaseService, public formBuilder: FormBuilder) {
        super(serviceBase1);
    }

    ngOnInit() {
        this.service.entity = this.entityapi = 'tree';
        this.breadCrumbItems = [{ label: 'Dashboard', path: '/' }, { label: 'Dev', path: '/' }, { label: 'Primeng module demo', path: '/', active: true }];

        this.validationform = this.formBuilder.group({
            id: [''],
            denumire: ['', [Validators.required]],
            description: ['', [Validators.required]]
          });

        this.service.findAllItems().subscribe((all) => {

            all = all.filter(function (entry) {
                return !entry['parinteid'] || entry['parinteid'] === '0';
            });

            let result = [];
            for(var i in all) {
                result.push({"data":all[i],"children":[{"data":{}}]})
            }

            this.list = result;

            this.columns = [];
            if (all && all.length > 0)
            for(var k in all[0]) {
       
             if (k != 'id')
              this.columns.push(k);
            }
        });

        super.ngOnInit();
    }


    add() {
        this.submitted = false;
        this.validationform.reset();
        this.item = new Category();
        this.item.parinteid = '0';

        if (this.selectedItems && this.selectedItems.length > 0)
            this.item.parinteid = this.selectedItems[0].data.id;

        this.displayDialog1 = true;
    }

    edit() {

        if (!this.validSelection(this.selectedItems))
        return;

        this.submitted = false;
        this.item = <Category> JSON.parse(JSON.stringify(this.selectedItems[0].data));
        this.validationform.patchValue(this.item);

        let self = this;
        this.service.findAllItemsEntity('categoryxarticles').subscribe(data => {

            data = data.filter(function (entry) {
              return entry['categoryid'] === self.item['id'];
            });
      
            self.categoryxarticles= data;
            self.displayDialog1 = true;
          });
    }

    onRowDblClick(event, data) {
        this.selectedItems = data;
        this.edit();
    }

    onSubmit(values: object) {
        (values['id'])?this.updateItem(values):this.createItem(values);
        this.submitted = true;

                    //save articles
    for (var key in this.categoryxarticles){
        if (this.categoryxarticles[key]['state'] == 'add'){
          delete this.categoryxarticles[key]['state'];
          this.service._createItemEntity('categoryxarticles', this.categoryxarticles[key]).subscribe(data => {
          });
        }
        if (this.categoryxarticles[key]['state'] == 'edit'){console.log(this.categoryxarticles);
          delete this.categoryxarticles[key]['state'];
          this.service.updateItemEntity('categoryxarticles', this.categoryxarticles[key]['id'], this.categoryxarticles[key]).subscribe(data => {
          }); 
        }
      }
      for (var key in this.categoryxarticles_deleted){
        this.service.deleteItemEntity('categoryxarticles', this.categoryxarticles[key]['id']).subscribe(data => {
        });
      }
    }

    createItem(data) { 

        this.item = data;
        this.item['id'] = this.guid();
        //created_at: this.currentDate.getDate() + '/' + this.currentDate.getMonth() + '/' + this.currentDate.getFullYear()
    
        if (this.validationform.valid) {
      
          this.service._createItem(this.item).subscribe((data: any) => {

            if (!this.selectedItems || this.selectedItems.length == 0) {
                let newitem = {"data":{},"children":[{"data":{}}]};
                newitem.data = this.item;
                newitem.children = [{"data":{}}];
                this.list.unshift(newitem);
            }
            else{
                this.treeNodeAdd(this.list, this.selectedItems[0].data, this.item);
            }

            this.validationform.reset();

            this.item = null;
            this.selectedItems = null;
            this.displayDialog1 = false;
            this.list = [...this.list];
          });
        }
    
    }
    
    updateItem(data) {
    
        if (this.validationform.valid) {
    
        this.item = data;
        this.service.updateItem(this.item['id'], this.item).subscribe(
          data => {

            this.treeRefresh(this.list, this.item);
            this.validationform.reset();

            this.item = null;
            this.selectedItems = null;
            this.displayDialog1 = false;
            this.list = [...this.list];
          });
        }
    
      }

      delete() {
        if (!this.validSelection(this.selectedItems)|| !confirm("Continue?"))
            return;

            let data = this.selectedItems;

            let self = this;
            for (var i = 0; i < data.length; i++) {
            this.service.deleteItem(data['id']).subscribe(res => {   
                self.ewodeletetree(this.list, data[i].data);        
                self.selectedItems = null;     
              });
        }

        this.selectedItems = null;
        this.list = [...this.list];
    }

    ewodeletetree(source, _item) {
        for (var key in source) {
            var item = source[key];
            if (item.data) {
                if (item.data.id == _item.id) {
                    this.service.deleteItem(_item.id).subscribe(res => {
                        source.splice(key, 1);    
                      });
                }
            }

            if (item.children) {
                this.ewodeletetree(item.children, _item);
            }
        }
    }

    exportPdf() {
        import("jspdf").then(jsPDF => {
            import("jspdf-autotable").then(x => {
                const doc = new jsPDF.default(0,0);
                doc.autoTable(this.columns, this.list);
                doc.save('primengTable.pdf');
            })
        })
    }
    
    exportExcel() {
        import("xlsx").then(xlsx => {
            const worksheet = xlsx.utils.json_to_sheet(this.list);
            const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
            const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
            this.saveAsExcelFile(excelBuffer, "primengTable");
        });
    }

    saveAsExcelFile(buffer: any, fileName: string): void {
        import("file-saver").then(FileSaver => {
            let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
            let EXCEL_EXTENSION = '.xlsx';
            const data: Blob = new Blob([buffer], {
                type: EXCEL_TYPE
            });
            FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
        });
    }

    get form() {
        return this.validationform.controls;
      }

      addNewArticleRow() { 
        this.categoryxarticles.push({
          id: this.service.guid(),
          categoryid: this.item.id, 
          article: '',
          price: 0,
          qty: 0,
          state: 'add'
        });
      }

        onRowEditInit(item: CategoryxArticles) {
    this.article_org = JSON.parse(JSON.stringify(item));
  }

  onRowEditSave(item) {
    if (item) {

      for (var key in this.categoryxarticles){
        if (this.categoryxarticles[key]['id'] == item.id)
        this.categoryxarticles[key] = item;

        if (this.categoryxarticles[key]['state'] != 'add')
          this.categoryxarticles[key]['state'] = 'edit';
      }
      delete this.article_org;
      console.log(this.categoryxarticles[key]);
    } 
  }

  onRowEditCancel(item: CategoryxArticles, index: number) {

    for (var key in this.categoryxarticles){
      if (this.categoryxarticles[key]['id'] == this.article_org['id'])
      this.categoryxarticles[key] = this.article_org; 
    }
    delete this.article_org;
  }

  onRowDelete(article) {
    this.categoryxarticles_deleted.push(article);

    for (var key in this.categoryxarticles){
      if (this.categoryxarticles[key]['id'] == article['id'])
      this.categoryxarticles.splice(parseInt(key), 1); 
    }
  }

      onNodeExpand(event) {

        if(event.node) {

            this.loading = true;
            this.service.findAllItems().subscribe((all) => {

            all = all.filter(function (entry) {
                return entry['parinteid'] === event.node.data.id;
            });

            let result = [];
            for(var i in all) {
                result.push({"data":all[i],"children":[{"data":{}}]})
            }

            event.node.children = result;
            this.list = [...this.list];
            this.loading =false;
        })

      }
        
    }
    
}