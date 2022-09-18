import {Component,OnInit} from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import {Base} from '../../_ewo/base';
import {EwoColumn, EwoProperty} from '../../_ewo/model/model';
import {SelectItem, LazyLoadEvent, FilterMetadata} from 'primeng/components/common/api';
import {TreeNode} from 'primeng/api';

import {BaseService as EwoService} from '../../_ewo/service/service';

import {Borderou} from './borderou.model';
import {BaseService} from './../../_services/base.service';
import { AuthenticationService } from 'src/app/core/services/auth.service';

@Component({
    templateUrl: 'borderou.component.html',
    providers: [EwoService,BaseService]
})
export class BorderouComponent extends Base implements OnInit {

    breadCrumbItems: Array<{}>;

    list:any[];
    columns: any[];
    item:Borderou;
    selectedItems:any[];
    value: Date;

    listpartner:SelectItem[];
    submitted: boolean;
    loading: boolean;
    validationform: FormGroup;

    listcomanda:any[];
    comandaid;

    listBonuriTrimise;
    rowGroupMetadata: any;
    selectedItemsTrimite;

    constructor(private serviceBase1:EwoService, private service:BaseService, 
        public formBuilder: FormBuilder,  private authenticationService: AuthenticationService) {
        super(serviceBase1);
    }

    ngOnInit() {
        this.service.entity = this.entityapi = 'tree';
        this.breadCrumbItems = [{ label: 'Dashboard', path: '/' }, { label: 'Dev', path: '/' }, { label: 'Primeng module demo', path: '/', active: true }];

        this.canEdit = this.canDelete = false;

        this.validationform = this.formBuilder.group({
            id: [''],
            artprodid: [''],
            artprod: ['', [Validators.required]],
            cantitate: ['', [Validators.required]]
          });


        this.service.findAllItemsEntity("comandainterna").subscribe((all) => {
            this.listcomanda = all;

            if (this.listcomanda && this.listcomanda.length > 0){
                this.comandaid = this.listcomanda[0]['id'];
                this.load(this.comandaid);
            }
        })

        super.ngOnInit();
    }

    trimitebon(){
        this.selectedItemsTrimite = [];
        this.displayDialog3 = true;
    }

    savetrimitebon(){

        const currentUser = this.authenticationService.currentUser();

        if (!this.selectedItemsTrimite || this.selectedItemsTrimite.length == 0){
            alert('Selectati cel putin un articol!');
            return;
        }

        let found = false;
        for (let i = 0; i < this.selectedItemsTrimite.length; i++) {
            if (!this.selectedItemsTrimite[i]['cantitateceruta'] || this.selectedItemsTrimite[i]['cantitateceruta'] == '' || 
            this.selectedItemsTrimite[i]['cantitateceruta'] == '0' || this.selectedItemsTrimite[i]['cantitateceruta'] == 0)
            found = true;
        }

        if (found){
            alert('Cel putin un articol are cantitatea ceruta necompletata!');
            return;
        }

        if (confirm("Confirmati trimiterea articolelor?")){

            let guid =  this.guid();
            for (let i = 0; i < this.selectedItemsTrimite.length; i++) {

            let _item =  JSON.parse(JSON.stringify(this.selectedItemsTrimite[i]));  
            

            delete _item['artprod'];
            delete _item['descriere'];

            _item['id'] = this.guid();
            _item['userid'] = currentUser['id'];
            _item['data'] = new Date();
            _item['sendid'] =  guid;
            this.service._createItemEntity("borderou", _item).subscribe((data: any) => {
            });

            }

            this.displayDialog3 = false;

        }
    }

    bonuritrimise(){

        let self = this;
        this.service.ewolist("borderou", null,null,null).subscribe((all) => {

            all = all.filter(function (entry) {
                return entry['sendid'] && (!entry['comandaid'] || entry['comandaid'] === self.comandaid);
            });

            self.listBonuriTrimise = all;
            self.updateRowGroupMetaData();
            self.displayDialog2 = true;
        });

    }

    onSort() {
        this.updateRowGroupMetaData();
    }

    updateRowGroupMetaData() {
        this.rowGroupMetadata = {};
        if (this.listBonuriTrimise) {
            for (let i = 0; i < this.listBonuriTrimise.length; i++) {
                let rowData = this.listBonuriTrimise[i];
                let sendid = rowData.sendid;
                if (i == 0) {
                    this.rowGroupMetadata[sendid] = { index: 0, size: 1 };
                }
                else {
                    let previousRowData = this.listBonuriTrimise[i - 1];
                    let previousRowGroup = previousRowData.sendid;
                    if (sendid === previousRowGroup)
                        this.rowGroupMetadata[sendid].size++;
                    else
                        this.rowGroupMetadata[sendid] = { index: i, size: 1 };
                }
            }
        }
    }

    onChange(event){
        this.load(event.value.id);
    }

    load(id){

        this.list = undefined;
        let self = this;

        setTimeout(function(){
            self.service.ewolist("borderoucomanda", null, null, null).subscribe((all) => {

                all = all.filter(function (entry) {
                    return !entry['comandaid'] || entry['comandaid'] === id;
                });
    
                self.list = all;
    
                self.columns = [];
                if (all && all.length > 0)
                for(var k in all[0]) {
           
                 if (k != 'id')
                  self.columns.push(k);
                }

                self.service.ewolist("borderou", null, null, null).subscribe((all) => {

                    all = all.filter(function (entry) {
                        return !entry['comandaid'] || entry['comandaid'] === id;
                    });
        
                    for(var k in all) {
                      self.list.push(all[k]);
                    }
                });

            });
        }, 1000);

    }


    add() {
        this.submitted = false;
        this.validationform.reset();
        this.item = new Borderou();

        this.displayDialog1 = true;
    }

    edit() {

        return;
        if (!this.validSelection(this.selectedItems))
        return;

        this.submitted = false;
        this.item = <Borderou> JSON.parse(JSON.stringify(this.selectedItems[0].data));

        this.displayDialog1 = true;
    }

    onRowDblClick(event, data) {
        return;
        this.selectedItems = data;
        this.edit();
    }

    onSubmit(values: object) {
        this.submitted = true;
        (values['id'])?this.updateItem(values):this.createItem(values);
    }


    createItem(data) { 

        this.item = data;
        this.item['id'] = this.guid();
        this.item['comandaid'] = this.comandaid;
        this.item['data'] = new Date();
        this.item['extra'] = 1;
        //created_at: this.currentDate.getDate() + '/' + this.currentDate.getMonth() + '/' + this.currentDate.getFullYear()
    
        if (this.validationform.valid) {
      
          this.service._createItemEntity("borderou", this.item).subscribe((data: any) => {

            this.list.unshift(this.item);
            this.validationform.reset();

            this.item = null;
            this.selectedItems = null;
            this.displayDialog1 = false;
          });
        }
    
    }
    
    updateItem(data) {
    
        if (this.validationform.valid) {
    
        this.item = data;
        this.service.updateItem(this.item['id'], this.item).subscribe(
          data => {

            this.list[this.findSelectedItem(this.list, this.selectedItems)] = this.item;
            this.validationform.reset();

            this.item = null;
            this.selectedItems = null;
            this.displayDialog1 = false;
          });
        }
    
      }


      delete() {
          return;
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


      onNodeExpand(event) {

        if(event.node) {

            this.loading = true;
            this.service.findAllItems().subscribe((all) => {

            all = all.filter(function (entry) {
                return entry['parentid'] === event.node.data.id;
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

    get form() {
        return this.validationform.controls;
      }
    
}