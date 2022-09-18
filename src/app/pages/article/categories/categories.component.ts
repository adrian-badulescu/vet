import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import { Base } from '../../_ewo/base';
import { EwoColumn, EwoProperty } from '../../_ewo/model/model';
import { SelectItem, LazyLoadEvent, FilterMetadata } from 'primeng/components/common/api';
import { TreeNode } from 'primeng/api';

import { BaseService as EwoService } from '../../_ewo/service/service';

import { Categorie, ArticleCls } from './categories.model';
import { CategoriesService } from './categories.service';
import { BaseService } from './../../_services/base.service';

@Component({
    templateUrl: 'categories.component.html',
    providers: [EwoService, BaseService, CategoriesService]
})
export class CategoriesComponent extends Base implements OnInit {

    breadCrumbItems: Array<{}>;
    Type: Array<string> = ['A', 'B'];

    list1: TreeNode[];
    list2: ArticleCls[];
    columns: any[];
    item1: Categorie;
    item2: ArticleCls;
    selectedItems1: TreeNode[];
    selectedItems2: ArticleCls[];
    value: Date;

    listpartner: SelectItem[];
    validationform1: FormGroup;
    validationform2: FormGroup;
    submitted: boolean;
    loading: boolean;

    constructor(private serviceBase1: EwoService, private service: BaseService,
        public formBuilder: FormBuilder, private service2: BaseService) {
        super(serviceBase1);
    }

    ngOnInit() {
        this.service.entity = this.entityapi = 'categorie';
        this.service2.entity = this.entityapi = 'article';

        this.breadCrumbItems = [{ label: 'Dashboard', path: '/' }, { label: 'Dev', path: '/' }, { label: 'Categories', path: '/', active: true }];

        this.validationform1 = this.formBuilder.group({
            id: [''],
            parinteid: [''],
            denumire: ['', [Validators.required]],
        });

        this.validationform2 = this.formBuilder.group({
            id: [''],
            idcat: [''],
            type: ['', [Validators.required]],
            um: ['', [Validators.required]],
            state: [''],
        });


        this.service.findAllItems().subscribe((all) => {

            all = all.filter(function (entry) {
                return !entry['parinteid'] || entry['parinteid'] === '0';
            });

            let result = [];
            for (var i in all) {
                result.push({ "data": all[i], "children": [{ "data": {} }] })
            }

            this.list1 = result;

            this.columns = [];
            if (all && all.length > 0)
                for (var k in all[0]) {

                    if (k != 'id')
                        this.columns.push(k);
                    console.log(k);
                    console.log(all);
                    console.log(this.list1);
                }
        });

        this.service2.findAllItems().subscribe((all) => {

            all = all.filter(function (entry) {
                return !entry['parinteid'] || entry['parinteid'] === '0';
            });

            let result = [];
            for (var i in all) {
                result.push({ "data": all[i], "children": [{ "data": {} }] })
            }

            this.list2 = result;

            this.columns = [];
            if (all && all.length > 0)
                for (var k in all[0]) {

                    if (k != 'id')
                        this.columns.push(k);
                    console.log(k);
                    console.log(all);
                    console.log(this.list2);
                }
        });


        super.ngOnInit();
    }


    add1() {
        this.submitted = false;
        this.validationform1.reset();
        this.item1 = new Categorie();
        this.item1.parinteid = '0';

        if (this.selectedItems1 && this.selectedItems1.length > 0)
            this.item1.parinteid = this.selectedItems1[0].data.id;

        this.displayDialog1 = true;
    }

    add2() {
        this.submitted = false;
        this.validationform2.reset();
        this.item2 = new ArticleCls();

        this.displayDialog2 = true;
    }




    edit1() {

        if (!this.validSelection(this.selectedItems1))
            return;

        this.submitted = false;
        this.item1 = JSON.parse(JSON.stringify(this.selectedItems1[0].data)) as Categorie;
        console.log(this.item1);
        this.validationform1.patchValue(this.item1);

        this.displayDialog1 = true;
    }

    edit2() {
        if (!this.validSelection(this.selectedItems2))
            return;

        this.submitted = false;
        this.item2 = JSON.parse(JSON.stringify(this.selectedItems2)) as ArticleCls;
        this.validationform2.patchValue(this.item2);

        this.displayDialog2 = true;
    }



    onRowDblClick(event, data) {
        this.selectedItems1 = data;
        this.edit1();
    }

    onSubmit1(values: object) {
        (values['id']) ? this.updateItem1(values) : this.createItem1(values);
        this.submitted = true;
    }

    onSubmit2(values: object) {
        (values['id']) ? this.updateItem2(values) : this.createItem2(values);
        this.submitted = true;
    }

    createItem1(data) {

        this.item1 = data;
        this.item1['id'] = this.guid();
        //created_at: this.currentDate.getDate() + '/' + this.currentDate.getMonth() + '/' + this.currentDate.getFullYear()

        if (this.validationform1.valid) {

            this.service._createItem(this.item1).subscribe((data: any) => {

                if (!this.selectedItems1 || this.selectedItems1.length == 0) {
                    let newitem = { "data": {}, "children": [{ "data": {} }] };
                    newitem.data = this.item1;
                    newitem.children = [{ "data": {} }];
                    this.list1.unshift(newitem);
                }
                else {
                    this.treeNodeAdd(this.list1, this.selectedItems1[0].data, this.item1);
                }

                this.validationform1.reset();

                this.item1 = null;
                this.selectedItems1 = null;
                this.displayDialog1 = false;
                this.list1 = [...this.list1];
            });
        }

    }

    createItem2(data) {

        this.item2 = data;
        this.item2['id'] = this.guid();
        //created_at: this.currentDate.getDate() + '/' + this.currentDate.getMonth() + '/' + this.currentDate.getFullYear()

        if (this.validationform2.valid) {

            this.service2._createItem(this.item2).subscribe((data: any) => {

                this.list2.unshift(this.item2);
                this.validationform2.reset();

                this.item2 = null;
                this.selectedItems2 = null;
                this.displayDialog2 = false;
            });
        }
        console.log(this.item2);
    }

    updateItem1(data) {

        if (this.validationform1.valid) {

            this.item1 = data;
            this.service.updateItem(this.item1['id'], this.item1).subscribe(
                data => {

                    this.treeRefresh(this.list1, this.item1);
                    this.validationform1.reset();

                    this.item1 = null;
                    this.selectedItems1 = null;
                    this.displayDialog1 = false;
                    this.list1 = [...this.list1];
                });
        }

    }

    updateItem2(data) {

        if (this.validationform2.valid) {

            this.item2 = data;
            this.service2.updateItem(this.item2['id'], this.item2).subscribe(
                data => {

                    this.list2[this.findSelectedItem(this.list2, this.selectedItems2)] = this.item2;
                    this.validationform2.reset();

                    this.item2 = null;
                    this.selectedItems2 = null;
                    this.displayDialog2 = false;
                });
        }

    }

    delete1() {
        if (!this.validSelection(this.selectedItems1) || !confirm("Continue?"))
            return;

        let data = this.selectedItems1;
        console.log(data);

        let self = this;
        for (let [k, v] of Object.entries(data)) {

            console.log(k, v['id']);


            this.service.deleteItem(v['id']).subscribe(res => {
                self.ewodeletetree(this.list1, data[0].data);
                console.log(v['id']);
                self.selectedItems1 = null;

            });
        }

        this.selectedItems1 = null;
        this.list1 = [...this.list1];
    }

    delete2() {
        if (!this.validSelection(this.selectedItems2) || !confirm("Continue?"))
            return;

        let data = this.selectedItems2;

        //for (var i = 0; i < this.selectedItems.length; i++) {
        this.service2.deleteItem(data['id']).subscribe(res => {
            this.list2.splice(this.findSelectedItem(this.list2, data), 1);
        });
        //}

        this.selectedItems2 = null;
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
                const doc = new jsPDF.default(0, 0);
                doc.autoTable(this.columns, this.list1);
                doc.save('primengTable.pdf');
            })
        })
    }

    exportExcel() {
        import("xlsx").then(xlsx => {
            const worksheet = xlsx.utils.json_to_sheet(this.list1);
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
        return this.validationform1.controls;
    }
    get form2() {
        return this.validationform2.controls;
    }

    onNodeExpand(event) {

        if (event.node) {

            this.loading = true;
            this.service.findAllItems().subscribe((all) => {

                all = all.filter(function (entry) {
                    return entry['parinteid'] === event.node.data.id;
                });

                let result = [];
                for (var i in all) {
                    result.push({ "data": all[i], "children": [{ "data": {} }] })
                }

                event.node.children = result;
                this.list1 = [...this.list1];
                this.loading = false;
            })

        }

    }

}