import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/toPromise';

import {EwoUtils} from '../utils';

@Injectable()
export class BaseService extends EwoUtils {

    eworootpath: string = 'data/';

    entityapi:string;
    entitydisplay:string;

    colOptions: any[];

    constructor(private http:Http) {
        super();
    }   


    item(id:string) {
        return this.ewoitem(id, this.entityapi);
    }
    list(filters:any,limit:number, offset:number) {
        return this.ewolist(this.entityapi, filters, limit, offset);
    }
    dropdown() {
        return this.ewodropdown(this.entityapi, this.entitydisplay);
    }
    save(item:any) {
        this.ewosave(this.entityapi, item);
    }
    delete(id:string) {
        this.ewodelete(this.entityapi, id);
    }

    listtree(parentfield:string) {
        return this.ewolisttree(this.entityapi, parentfield);
    }
    listtreechildren(id:string, parentfield:string) {
        return this.ewolisttreechildren(this.entityapi, id, parentfield);
    }
    deletetree(source, _item) {
        this.ewodeletetree(this.entityapi, source, _item);
    }

    ewoitem(id:string, entity:string) {
        return this.http.get(this.ewobaseurl+entity)
            .toPromise()
            .then(res => res.json().data)
            .then(data => {
                let result = [];
                this.getItem(id, data, result);
                return result;
            });
    }

    ewolist(entity:string, filters:any, limit:number, offset:number) {


        let params={'offset':offset,'limit':limit};

/*        if (filters)
            params['where'] = filters;*/

/*        return this.http.get(this.ewobaseurl+entity + filters?'?filter='+JSON.stringify(filters):'')
        return this.http.get(this.ewobaseurl+entity + filters?'?filter='+JSON.stringify(filters):'?filter={"limit":'+limit+'}')*/

        if (filters == null || limit == null || offset == null)
        {
            return this.http.get(this.ewobaseurl + entity)
                .toPromise()
                .then(res => <any[]> res.json())
                .then(data => {
                    return data;
                });
        }
        else {
            return this.http.get(this.ewobaseurl + entity + '?filter=' + JSON.stringify(params))
                .toPromise()
                .then(res => <any[]> res.json())
                .then(data => {
                    return data;
                });
        }
    }
    ewolistdetail(id:string, entity:string, field:string) {
        return this.http.get(this.ewobaseurl + entity)
            .toPromise()
            .then(res => <any[]> res.json())
            .then(data => {

                if (id !== '' && field !== '') {
                    data = data.filter(function (entry) {
                        return entry[field] === id;
                    });
                }

                return data;
            });
    }
    ewolisttree(entity:string, parentfield:string) {
        return this.http.get(this.ewobaseurl+entity)
            .toPromise()
            .then(res => <any[]> res.json())
            .then(data => {
                data = data.filter(function (entry) {
                    return entry[parentfield] === '0';
                });

                let result = [];
                for(var i in data) {
                    result.push({"data":data[i],"children":[{"data":{}}]})
                }

                return result;
            });
    }
    ewolisttreechildren(entity:string, id:string, parentfield:string) {

        return this.http.get(this.ewobaseurl+entity)
            .toPromise()
            .then(res => <any[]> res.json())
            .then(data => {
                data = data.filter(function (entry) {
                    return entry[parentfield] === id;
                });

                let result = [];
                for(var i in data) {
                    result.push({"data":data[i],"children":[{"data":{}}]})
                }

                return result;
            });
    }

    ewodropdown(entity:string, displayfield:string) {
        return this.http.get(this.ewobaseurl+entity)
            .toPromise()
            .then(res => res.json())
            .then(data => {
                let result = [];
                this.ewogetdropdown(data, result, displayfield);
                return result;
            });
    }
    ewogetdropdown(source, result, displayfield:string) {

        for (var key in source) {
            var item = source[key];
            let newitem = {"value":"","label":""};
            newitem.value = item.id;
            newitem.label = item[displayfield];
            result.push(newitem);
        }

        return result;
    }

    //jsonserver
    ewocreate(entity:string, item:any) {

        var headers = new Headers();
        headers.append("Content-Type", "application/json");

        if (entity == 'ewomodules')
        {
            let itemtable = {id:this.guid(), entitytypeid: item.entitytypeid, name: item.name, main:1};
            this.ewocreate('ewotables', itemtable);
        }

        if (entity == 'ewotables')
        {
            /*            let itemtable = {id: item.id, tablename: item.name, values:[]};
             this.ewocreate('tables', itemtable);*/

            let itemfield = {id: this.guid(), entitytypeid: item.entitytypeid, tablename: item.name, name: 'id', type:'id'};
            this.ewocreate('ewofields', itemfield);

            let itemprop = {id: this.guid(), entitytypeid: item.entitytypeid, tablename: item.name, control: 'form', model:'form', width:600, label:''};
            this.ewocreate('ewoproperties', itemprop);

            if (item.main == 1)
            {
                let itemservice = {id: this.guid(), entitytypeid: item.entitytypeid, tablename: item.name, name: 'list'};
                this.ewocreate('ewoservices', itemservice);
            }
        }

        if (entity == 'ewocontrols' || entity == 'ewotabs' || entity == 'ewofields')
        {
            //let _prop = this.ewogenproperties(item.entitytypeid, item.tablename, item.name);
            //if (Object.keys(_prop).length == 0) {
            let itemprop = {id: this.guid(), entitytypeid: item.entitytypeid, tablename: item.tablename, control: item.name, model:'', width:200, label:''};
            this.ewocreate('ewoproperties', itemprop);
            //}

            let itemevent = {id: this.guid(), entitytypeid: item.entitytypeid, tablename: item.tablename, name:"", control: item.name, script:''};
            this.ewocreate('ewoevents', itemevent);
        }

        if (entity == 'ewofields')
        {
        }

        return this.http.post(this.ewobaseurl+entity, JSON.stringify(item),{headers: headers})
            .toPromise()
            .then(res => res.json())
            .then(data => console.log('create '+entity,data));
    }

    ewoupdate(entity:string, item:any) {

        var headers = new Headers();
        headers.append("Content-Type", "application/json");

        if (entity == 'ewofields' || entity == 'ewotabs')
        {
            //let _prop = this.ewogenproperties(item.entitytypeid, item.tablename, item.name);
            //if (Object.keys(_prop).length == 0) {
            let itemprop = {id: this.guid(), entitytypeid: item.entitytypeid, tablename: item.tablename, control: item.name, model:'', width:200, label:''};
            this.ewocreate('ewoproperties', itemprop);
            //}

            let itemevent = {id: this.guid(), entitytypeid: item.entitytypeid, tablename: item.tablename, name:"", control: item.name, script:''};
            this.ewocreate('ewoevents', itemevent);
        }

        return this.http.put(this.ewobaseurl+entity+"/"+item.id, JSON.stringify(item),{headers: headers})
            .toPromise()
            .then(res => res.json())
            .then(data => console.log('update '+entity,data));
    }

    existitemname(entity: string, name: string){

        return this.http.get(this.ewobaseurl+entity)
            .toPromise()
            .then(res => res.json())
            .then(data => {

                data = data.filter(function (entry) {
                    return (!entry.hasOwnProperty('deleted') || entry['deleted'] == false) && entry['name'] === name;
                });

                return data;
            });
    }

    ewosave(entity:string, item:any) {

        return this.http.get(this.ewobaseurl + entity)
            .toPromise()
            .then(res => <any[]> res.json())
            .then(data => {

                data = data.filter(function (entry) {
                    return entry.id === item.id;
                });

                if (Object.keys(data).length == 0)
                {
                    this.ewocreate(entity, item);
                }
                else
                {
                    this.ewoupdate(entity, item);
                }
            });


        /*        var headers = new Headers();
         headers.append("Content-Type", "application/json");

         this.http.put(this.ewobaseurl+entity, JSON.stringify(item),{headers: headers})
         .toPromise()
         .then(res => res.json())
         .then(data => console.log('save '+entity,item));*/
    }

/*    ewosave(entity:string, item:any) {

        var headers = new Headers();
        headers.append("Content-Type", "application/json");

        this.http.put(this.ewobaseurl+entity, JSON.stringify(item),{headers: headers})
            .toPromise()
            .then(res => res.json())
            .then(data => console.log('save '+entity+': '+item.id));
    }*/
    ewodelete(entity:string, id:string) {
        return this.http.delete(this.ewobaseurl+entity+'/'+id)
            .toPromise()
            .then(res => res.json())
            .then(data => console.log('delete '+entity+': '+id, data));
    }
    ewodeleteupdate(entity:string, item:any) {
        item['deleted'] = true;
        return this.ewoupdate(entity, item);
    }
    ewoundeleteupdate(entity:string, item:any) {
        item['deleted'] = false;
        return this.ewoupdate(entity, item);
    }
    ewodeletetree(entity:string, source, _item) {
        for (var key in source) {
            var item = source[key];
            if (item.data) {
                if (item.data.id == _item.id) {
                    this.ewodelete(entity, _item.id);
                    source.splice(key, 1);
                }
            }

            if (item.children) {
                this.ewodeletetree(entity, item.children, _item);
            }
        }
    }

    ewomodules() {
        return this.http.get(this.ewobaseurl + 'ewomodules')
            .toPromise()
            .then(res => <any[]> res.json())
            .then(data => {
                return data;
            });
    }


    ewotables(entitytypeid:string) {
        return this.http.get(this.ewobaseurl + 'ewotables')
            .toPromise()
            .then(res => <any[]> res.json())
            .then(data => {
                data = data.filter(function (entry) {
                    return entry.entitytypeid === entitytypeid;
                });

                return data;
            });
    }

    ewofields(entitytypeid:string) {
        return this.http.get(this.ewobaseurl + 'ewofields')
            .toPromise()
            .then(res => <any[]> res.json())
            .then(data => {
                data = data.filter(function (entry) {
                    return entry.entitytypeid === entitytypeid;
                });

                return data;
            });
    }

    ewocolumns(entitytypeid:string) {
        return this.http.get(this.ewobaseurl + 'ewocolumns')
            .toPromise()
            .then(res => <any[]> res.json())
            .then(data => {
                data = data.filter(function (entry) {
                    return entry.entitytypeid === entitytypeid;
                });

                return data;
            });
    }

    //jsonserver
    ewogenproperties(entitytypeid:string, tablename:string, control:string) {
        return this.http.get(this.ewobaseurl + 'ewoproperties')
            .toPromise()
            .then(res => <any[]> res.json())
            .then(data => {
                data = data.filter(function (entry) {
                    return entry.entitytypeid === entitytypeid &&
                        entry.tablename === tablename &&
                        entry.control === control;
                });

                return data;
            });
    }

    ewoproperties(entitytypeid:string) {
        return this.http.get(this.ewobaseurl + 'ewoproperties')
            .toPromise()
            .then(res => <any[]> res.json())
            .then(data => {
                data = data.filter(function (entry) {
                    return entry.entitytypeid === entitytypeid;
                });

                return data;
            });
    }

    ewoservices(entitytypeid:string) {
        return this.http.get(this.ewobaseurl + 'ewoservices')
            .toPromise()
            .then(res => <any[]> res.json())
            .then(data => {
                data = data.filter(function (entry) {
                    return entitytypeid == '' || entry.entitytypeid === entitytypeid;
                });

                return data;
            });
    }

    ewoevents(entitytypeid:string) {
        return this.http.get(this.ewobaseurl + 'ewoevents')
            .toPromise()
            .then(res => <any[]> res.json())
            .then(data => {
                data = data.filter(function (entry) {
                    return entitytypeid == '' || entry.entitytypeid === entitytypeid;
                });

                return data;
            });
    }

    saveTables(data) {
        let itemTable = {};
        for(var i in data) {
            itemTable = data[i];
            this.ewosave('ewotables', itemTable);
        }
    }

    saveFields(data) {
        let itemField = {};
        for(var i in data) {
            itemField = data[i];
            this.ewosave('ewofields', itemField);
        }
    }

    saveColumns(data) {
        let itemColumn = {};
        for(var i in data) {
            itemColumn = data[i];
            this.ewosave('ewocolumns', itemColumn);
        }
    }

    saveModuleProperty(data) {
        let itemModuleProperty = {};
        for(var i in data) {
            itemModuleProperty = data[i];
            this.ewosave('ewoproperties', itemModuleProperty);
        }
    }

    saveProperties(data) {
        let itemProp = {};
        for(var i in data) {
            itemProp = data[i];
            this.ewosave('ewoproperties', itemProp);
        }
    }

    getItem(id, source, result) {

        for (var key in source) {
            var item = source[key];
            if (item.data) {
                if (item.data.id === id) {
                    result.push(item.data);
                    break;
                }
            }
            if (item.children) {
                this.getItem(id, item.children, result);
            }
        }

        return result;
    }

    //jsonserver
    ewocount(entityapi:string) {
        /*        return this.http.get(this.ewobaseurl + entityapi + "/count")
         .toPromise()
         .then(res => <any[]> res.json())
         .then(data => {
         return data;
         });*/

        return this.http.get(this.ewobaseurl + entityapi)
            .toPromise()
            .then(res => <any[]> res.json())
            .then(data => {
                return Object.keys(data).length;
            });
    }

    console() {
        console.log('test');
    }
}