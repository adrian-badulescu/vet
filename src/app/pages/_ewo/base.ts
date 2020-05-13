import {Component, OnInit} from '@angular/core';

import { environment } from 'src/environments/environment';

import {EwoTable, EwoField, EwoColumn, EwoProperty} from './model/model';
import {BaseService} from './service/service';
//import {GlobalService} from './global';

/*declare var $:JQueryStatic;*/

@Component({
    selector: 'bse',
    templateUrl: 'base.html',
    providers: [BaseService]
})
export class Base implements OnInit {

/*    http: Http;*/

    eworootpath; ewobaseurl;

    canList:boolean; canAdd: boolean;
    canEdit: boolean; canDelete: boolean;
    canSave: boolean;

    entityid: string;
    entityapi: string;
    entitytypeid: string;
    entityname: string;
    count:number;

    editorMode:number;
    itemid:string;
    displayDialog1:boolean;
    displayDialog2:boolean;
    displayDialog3:boolean;
    displayDialog4:boolean;
    displayDialog5:boolean;

    displayTables:boolean;
    ewotables: any[];tables: any[];
    selectedTables:EwoTable[];
    tableOptions: any[];
    labeledittable = "edit tables";

    displayFields:boolean;
    ewofields: any[];fields: {};
    selectedFields:EwoField[];
    fieldOptions: any[];
    labeleditfield = "edit fields";

    displayColumns:boolean;
    ewocolumns: any[];columns: {};
    selectedColumns:EwoColumn[];
    columnOptions: any[];
    labeleditcolumn = "edit columns";

    displayModuleProperties:boolean;
    moduleproperties: {};
    selectedModuleProperties:EwoProperty[];
    labeleditmoduleproperty= "edit properties";

    displayProperties:boolean;
    ewoproperties: any[];properties: {};
    selectionmode = "multiple";
    controlgrid = "";
    controlproperty = "";
    typeproperty = "";

    ewoservices; ewoevents;

    viewid:string='-1';
    itemResult:{};
    displayEntityContext:boolean;

    displayLayout = false;
    urlLayout = '';

    utils: any;

    constructor(private serviceBase:BaseService) {

        this.eworootpath = 'data/';
        //this.ewobaseurl = 'http://81.12.235.14:3222/api/';
        //this.ewobaseurl = 'http://81.12.235.14:3222/';
        this.ewobaseurl = environment.server.url+'/api/db-queries/execute/'; ; //'http://46.97.75.250:3223/'; 

        this.canList = this.canAdd = this.canEdit = this.canDelete = this.canSave = true;
      /*  this.http = http;*/

/*        if (routeSegment != undefined) {
            if (routeSegment.getParam('viewid'))
                this.viewid = routeSegment.getParam('viewid');
        }

        if (routeSegment != undefined && routeSegment.getParam('itemid'))
            this.itemid = routeSegment.getParam('itemid');*/
    }

    ngOnInit() {
        //this.serviceBase.ewocount(this.entityapi).then(all => this.count = all["count"]);
        // this.serviceBase.ewocolumns(this.entitytypeid).then(all => {this.ewocolumns = all; this.columns = this.getcolumns();});
        // this.serviceBase.ewotables(this.entitytypeid).then(all => {this.ewotables = all; this.tables = this.gettables();});
        // this.serviceBase.ewofields(this.entitytypeid).then(all => {this.ewofields = all; this.fields = this.getfields();});
        // this.serviceBase.ewoproperties(this.entitytypeid).then(all => {this.ewoproperties = all; this.properties = this.moduleproperties = this.getproperties();});
        //this.serviceBase.ewoservices(this.entitytypeid).then(all => {this.ewoservices = all; console.log('services',this.ewoservices);});
        //.serviceBase.ewoevents(this.entitytypeid).then(all => {this.ewoevents = all; console.log('events',this.ewoevents);});
    }

    s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    guid() {

        return this.s4() + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' +
            this.s4() + '-' + this.s4() + this.s4() + this.s4();
    }

    editcolumn() {
        if (this.selectionmode == "multiple")
        {
            this.selectionmode = "";
            this.labeleditcolumn = "cancel edit columns";
        }
        else
        {
            this.selectionmode = "multiple";
            this.labeleditcolumn = "edit columns";
        }
    }
    editColumns(control:string) {
        if (this.properties['admin']) {
            this.controlgrid = control
            this.displayColumns = true;
        }
    }

    findSelectedColumn(control:string,col: EwoColumn): number {
        return this.columns[control].indexOf(col);
    }
    addColumn(control:string) {
        let col = new EwoColumn();
        col.id = this.guid();
        col.entitytypeid = this.entitytypeid;
        col.tablename = control;
        col.field = "new column";

        if (!this.columns[control])
            this.columns[control] = [];

        this.columns[control].push(col);
    }
    delColumn(control:string) {
        if (!this.validSelection(this.selectedColumns))
            return;

        for(var i = 0; i < this.selectedColumns.length; i++){
            this.serviceBase.ewodelete('ewocolumns', this.selectedColumns[i].id);
            this.columns[control].splice(this.findSelectedColumn(control, this.selectedColumns[i]), 1);
        }

        this.selectedColumns = null;
    }
    saveColumns(control:string) {
        this.serviceBase.saveColumns(this.columns[control]);
        this.displayColumns = false;
    }

    eworoutes() {

/*        this.http.get('localhost/ang2/prime13/phpapi/ewogenroutes.php')
            .map((res: Response) => {}).subscribe(res => console.log(res));

        alert('finish!');*/
    }

    ewobuild(module:string) {
        var m = module;
        console.log(m);

/*        this.http.get('phpapi/ewobuildmodule.php?modules='+modules)
            .map((res: Response) => {}).subscribe(res => console.log(res));

        alert('finish!');*/

    }

    ewolayout(module:string, form:string) {

        if (module == '')
        {
            alert('Entity name is empty!');
            return;
        }

        if (form == '')
        {
            alert('Form name is empty!');
            return;
        }

        this.displayLayout = true;
        this.urlLayout = "layout/index.php?modules="+module+"&form="+form;
        //window.open('layout/index.php?modules='+modules+'&form='+form, '_blank');
    }

    edittable() {
        if (this.selectionmode == "multiple")
        {
            this.selectionmode = "";
            this.labeledittable = "cancel edit tables";
        }
        else
        {
            this.selectionmode = "multiple";
            this.labeledittable = "edit tables";
        }
    }
    editTables(control:string) {
        if (this.properties['admin']) {
            this.controlgrid = control
            this.displayTables = true;
        }
    }
    findSelectedTable(control:string,col: EwoTable): number {
        console.log(control);
        return this.tables.indexOf(col);
    }
    addTable(control:string) {
        console.log(control);
        let table = new EwoTable();
        table.id = this.guid();
        table.entitytypeid = this.entitytypeid;
        table.name = "new table";

        this.tables.push(table);
    }
    delTable(control:string) {
        if (!this.validSelection(this.selectedTables))
            return;

        for(var i = 0; i < this.selectedTables.length; i++){
            this.serviceBase.ewodelete('ewotables', this.selectedTables[i].id);
            this.tables.splice(this.findSelectedTable(control, this.selectedTables[i]), 1);
        }

        this.selectedTables = null;
    }
    saveTables(control:string) {
        console.log(control);
        this.serviceBase.saveTables(this.tables);
        this.displayTables = false;
    }

    editfield() {
        if (this.selectionmode == "multiple")
        {
            this.selectionmode = "";
            this.labeleditfield = "cancel edit fields";
        }
        else
        {
            this.selectionmode = "multiple";
            this.labeleditfield = "edit fields";
        }
    }

    /*
     editFields(modules:string, form:string) {
     window.open('layout/index.php?modules='+modules+'&form='+form, '_blank');
     }
     */


    editFields(control:string) {
        if (this.properties['admin']) {
            this.controlgrid = control
            this.displayFields = true;
        }
    }
    findSelectedField(control:string,col: EwoField): number {
        return this.fields[control].indexOf(col);
    }
    addField(control:string) {
        let field = new EwoField();
        field.id = this.guid();
        field.entitytypeid = this.entitytypeid;
        field.tablename = control;
        field.name = "new field";

        if (!this.fields[control])
            this.fields[control] = [];

        this.fields[control].push(field);
    }
    delField(control:string) {
        if (!this.validSelection(this.selectedFields))
            return;

        for(var i = 0; i < this.selectedFields.length; i++){
            this.serviceBase.ewodelete('ewofields', this.selectedFields[i].id);
            this.fields[control].splice(this.findSelectedField(control, this.selectedFields[i]), 1);
        }

        this.selectedFields = null;
    }
    saveFields(control:string) {
        console.log(control);
        for (var key in this.fields) {
            this.serviceBase.saveFields(this.fields[key]);
        }
        this.displayFields = false;
    }

    editmoduleproperty() {
        if (this.selectionmode == "multiple")
        {
            this.selectionmode = "";
            this.labeleditmoduleproperty = "cancel edit properties";
        }
        else
        {
            this.selectionmode = "multiple";
            this.labeleditmoduleproperty = "edit properties";
        }
    }

    editModuleProperties(control:string) {
        if (this.moduleproperties['admin']) {
            this.controlgrid = control
            this.displayModuleProperties = true;
        }
    }
    findSelectedModuleProperty(control:string,col: EwoProperty): number {
        return this.moduleproperties[control].indexOf(col);
    }
    addModuleProperty(control:string) {
        let field = new EwoProperty();
        field.id = this.guid();
        field.entitytypeid = this.entitytypeid;
        field.tablename = control;
        field.control = "new property";

        if (!this.moduleproperties[control])
            this.moduleproperties[control] = [];

        this.moduleproperties[control].push(field);
    }
    delModuleProperty(control:string) {
        if (!this.validSelection(this.selectedModuleProperties))
            return;

        for(var i = 0; i < this.selectedModuleProperties.length; i++){
            this.serviceBase.ewodelete('ewoproperties', this.selectedModuleProperties[i].id);
            this.moduleproperties[control].splice(this.findSelectedModuleProperty(control, this.selectedModuleProperties[i]), 1);
        }

        this.selectedModuleProperties = null;
    }
    saveModuleProperties(control:string) {
        this.serviceBase.saveModuleProperty(this.moduleproperties[control]);
        this.displayModuleProperties = false;
    }

    editProperties(control:string, type:string) {
        if (this.properties['admin']) {
            this.controlproperty = control
            this.typeproperty = type;
            this.displayProperties = true;
        }
    }

    saveProperties(control:string, type:string) {
        this.serviceBase.saveProperties(this.properties[control][type]);
        this.displayProperties= false;
    }

    public validSelection(selected:any[]):boolean {
        if (!selected || selected.length == 0) {
            alert('Select item!');
            return false;
        }

        return true;
    }

    treeRefresh(source, _item) {
        for (var key in source) {
            var item = source[key];
            if (item.data) {
                if (item.data.id == _item.id)
                    item.data = _item;
            }
            if (item.children) {
                this.treeRefresh(item.children, _item);
            }
        }
    }

    treeNodeDelete(source, _item) {
        for (var key in source) {
            var item = source[key];
            if (item.data) {
                if (item.data.id == _item.id)
                    source.splice(key, 1);
            }

            if (item.children) {
                this.treeNodeDelete(item.children, _item);
            }
        }
    }

    treeNodeAdd(source, _parent, _item) {
        for (var key in source) {
            var item = source[key];
            if (item.data) {
                if (item.data.id == _parent.id)
                {
                    let newitem = {"data":{},"children":[]};
                    newitem.data = _item;
                    newitem.children = [];
                    item.children.unshift(newitem);
                }
            }

            if (item.children) {
                this.treeNodeAdd(item.children, _parent, _item);
            }
        }
    }

    findSelectedItem(source, _item, id='id'):number {
        for (var key in source) {
            var item = source[key];
            if (item) {
                if (item[id] == _item[id])
                    return parseInt(key);
            }
        }

        return -1;
    }

    showEntityContext() {
        this.displayEntityContext = true;
    }
    saveEntityContext() {
        //this.serviceGlobal.setItem({})
    }

    gettables() {

        let result = [];
        if (this.ewotables != undefined && this.ewotables.length > 0)
        {
            let item, table;
            console.log(table);
            for(var i in this.ewotables) {

                item = this.ewotables[i];
                result.push(
                    {
                        "id":item['id'],
                        "entitytypeid":item['entitytypeid'],
                        "name":item['name']
                    });
            }
        }

        return result;
    }

    getfields() {

        let result = {};
        if (this.ewofields != undefined && this.ewofields.length > 0)
        {
            let item, table;
            for(var i in this.ewofields) {

                item = this.ewofields[i];
                table = item['tablename'];

                if (!result.hasOwnProperty(table))
                    result[table] = [];

                result[table].push(
                    {
                        "id":item['id'],
                        "entitytypeid":item['entitytypeid'],
                        "tablename":item['tablename'],
                        "name":item['name']
                    });
            }
        }

        return result;
    }

    getcolumns() {

        let result = {};

        if (this.ewocolumns != undefined && this.ewocolumns.length > 0)
        {
            let item, table;
            for(var i in this.ewocolumns) {

                item = this.ewocolumns[i];
                table = item['tablename'];
                if (!result.hasOwnProperty(table))
                    result[table] = [];

                result[table].push(
                    {
                        "id":item['id'],
                        "tablename":item['tablename'],
                        "field":item['field'],
                        "header":item['header'],
                        "ord":item['ord'],
                        "entitytypeid":item['entitytypeid']
                    });
            }
        }

        return result;
    }

    getclassrequired(table, control, prop, value){

        if (!this.properties)
            return value;

        if (!this.properties[table])
            return value;

        if (!this.properties[table][control] || this.properties[table][control].length <= 0)
            return value;

        if (!this.properties[table][control][0][prop])
            return value;

        return 'eworequired';
    }

    getlabelrequired(table, control, prop, value){

        if (!this.properties)
            return value;

        if (!this.properties[table])
            return value;

        if (!this.properties[table][control] || this.properties[table][control].length <= 0)
            return value;

        if (!this.properties[table][control][0][prop])
            return value;

        return '*';
    }

    getproperties() {

        let result = {};
        result['admin'] = false;

        if (this.ewoproperties != undefined && this.ewoproperties.length > 0)
        {
            let item, table, control;
            for(var i in this.ewoproperties) {

                item = this.ewoproperties[i];
                table = item['tablename'];
                control = item['control'];

                if (!result.hasOwnProperty(table))
                    result[table] = {};
                if (!result[table].hasOwnProperty(control))
                    result[table][control] = [];

                result[table][control].push(
                    {
                        "id":item['id'],
                        "entitytypeid":item['entitytypeid'],
                        "tablename":item['tablename'],
                        "control":item['control'],
                        "model":item['model'],
                        "width":item['width'],
                        "label":item['label'],
                        "type":item['type'],
                        "tableoptions":item['tableoptions'],
                        "required":item['required']
                    });
            }
        }

        return result;
    }

    setproperties(table, control, prop, value){

        if (!this.properties)
            return value;

        if (!this.properties[table])
            return value;

        if (!this.properties[table][control] || this.properties[table][control].length <= 0)
            return value;

        if (!this.properties[table][control][0][prop])
            return value;

        return this.properties[table][control][0][prop];
    }

    getclassmodel(table, control, prop, value){

        if (!this.properties)
            return value;

        if (!this.properties[table])
            return value;

        if (!this.properties[table][control] || this.properties[table][control].length <= 0)
            return value;

        if (!this.properties[table][control][0][prop])
            return value;

        return '';
    }

    getlistproperties(control, type){

        if (!this.properties)
            return [];

        if (!this.properties[control])
            return [];

        if (!this.properties[control][type])
            return [];

        return this.properties[control][type];
    }

    getmoduleproperties() {

        let result = {};
        result['admin'] = true;

        if (this.ewoproperties != undefined && this.ewoproperties.length > 0)
        {
            let item, table;
            for(var i in this.ewoproperties) {

                item = this.ewoproperties[i];
                table = item['tablename'];

                if (!result.hasOwnProperty(table))
                    result[table] = [];

                result[table].push(
                    {
                        "id":item['id'],
                        "entitytypeid":item['entitytypeid'],
                        "tablename":item['tablename'],
                        "control":item['control'],
                        "model":item['model'],
                        "width":item['width'],
                        "label":item['label']
                    });
            }
        }

        return result;
    }

    leftjoin(listparent, fieldparentid, fieldparentdisplay, listchild) {
        if (listparent != undefined && listparent.length > 0 &&
            listchild != undefined && listchild.length > 0) {
            for (var i1 in listparent) {
                let item1 = listparent[i1];

                for (var i2 in listchild) {
                    let item2 = listchild[i2];

                    if (item1[fieldparentid] === item2['value']) {
                        item1[fieldparentdisplay] = item2['label'];
                    }
                }
            }
        }
    }
}
