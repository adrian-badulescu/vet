import { Component,OnInit,ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import {formatDate} from '@angular/common';

import {Base} from '../../_ewo/base';
import {BaseService} from '../../_ewo/service/service';

@Component({
  selector: 'partnerxdivizie',
  styleUrls: ['./partnerxdivizie.component.css'],
  templateUrl: './partnerxdivizie.component.html',
  providers: [BaseService]
})
export class PartnerxdivizieComponent  extends Base implements OnInit{

    list:any[];
    user: any = {};
    listsearchtype:any=0; listsearchwords:any='';
    breadCrumbItems: Array<{}>;

    // email="cbarusc@yahoo.com";
    taskid;
    login = 'a@a.ro';
    tasks=[];
    details=[];

    constructor(private serviceBasel:BaseService, private elementRef:ElementRef,
                private router: Router) {
        
                    super(serviceBasel);

        if (localStorage.getItem('elttasklogin') && localStorage.getItem('elttasklogin') != null)
            this.login = localStorage.getItem('elttasklogin');

            this.login = 'a@a.ro';
            this.loadpartners();
    }

    ngOnInit() {

        this.breadCrumbItems = [{ label: 'Dashboard', path: '/' }, { label: 'Rapoarte', path: '/' }, { label: 'Parteneri/Divizii', path: '/', active: true }];

        //this.entitytypeid = "users";
        //this.entityapi = "users";

        let self = this;

        // if (localStorage.getItem('currentUser')) {
        //     self.user = JSON.parse( localStorage.getItem('currentUser') );
        //     this.loadpartners();
        // }

        this.details = [];

        // this.serviceBasel.ewolist("users", null, null, null).then(data => {
        //     this.list = data;
        // });

        //super.ngOnInit();
    }

    loadpartners(){
        let self = this;

        // this.details = [{"id":"_1EC9ECE55S93S","partenerid":"_D0CDE0749S93S","divizie":"Siemens Erlangen"},{"id":"_294E16A14dmin","partenerid":"_117E23594dmin","divizie":"Divizia 1"},{"id":"_2B8BD6E79IXNK","partenerid":"BLOCK","divizie":"Divizia 1"},{"id":"_2F78B5174B941","partenerid":"ALS","divizie":"divizie 3"},{"id":"_3E6DE0884B941","partenerid":"ABB","divizie":"Electric"},{"id":"_554BF8A18dmin","partenerid":"ALS","divizie":"divizie 2"},{"id":"_58944F794dmin","partenerid":"ALS","divizie":"divizie 1"},{"id":"_6666B1495B941","partenerid":"_E9BCE00201834","divizie":"Al Farraj Trading & Manufacturing Company"},{"id":"_89C937557dmin","partenerid":"_CB0A6D70dmin","divizie":"34"},{"id":"_A40C51686B941","partenerid":"_1E1D13855B941","divizie":"First Philec Solar Corp."},{"id":"_CD857ED36B941","partenerid":"_E9BCE00201834","divizie":"Farraj Trading Manufacturing Co."},{"id":"_DAD516B95B941","partenerid":"_A93409341B941","divizie":"Austria"},{"id":"_E08E85E67AG9O","partenerid":"_349171F5AG9O","divizie":"MGL"},{"id":"_E8DB3F65AG9O","partenerid":"_626FB6753AG9O","divizie":"SCHNEIDER EMT"},{"id":"0d6a4a79-8fd0-fa1b-5b36-6136f928467d","partenerid":"_1E1D13855B941","divizie":"d2"},{"id":"44ef6e6d-4266-1b73-2df2-de18ce047a57","partenerid":"_1814D5A11IRQF","divizie":"d3"},{"id":"46dd8afc-9c70-4231-17d5-ad71c40c087b","partenerid":"KUKA","divizie":"ADE"},{"id":"6a5aa5ae-1b3d-b539-88dc-58f15b06a4c0","partenerid":"1736bb63-4ff8-c8d3-ab89-5a66da640d16","divizie":"div1"},{"id":"73455486-41b8-dd25-2b62-089cd3e2038e","partenerid":"2934762d-3d15-632e-307a-52b8077e3f88","divizie":"d33"},{"id":"78bbe2d0-e002-1f7a-70b8-5f46ed641d40","partenerid":"_B3BD9D66443CZ","divizie":"div1"},{"id":"7f5d2c04-6c01-d712-95ce-57629d551dc7","partenerid":"1736bb63-4ff8-c8d3-ab89-5a66da640d16","divizie":"div2"},{"id":"87cea747-6ddb-f11e-660a-22a5ccf59d01","partenerid":"_34953DE329XJF","divizie":"d1"},{"id":"b6e2bc84-1c6b-eaf7-5f3f-2cc6ff8a75a1","partenerid":"_1E1D13855B941","divizie":"d1"},{"id":"ef996336-a599-6f8f-49d3-e17e7a1f2b5f","partenerid":"_1814D5A11IRQF","divizie":"d1"},{"id":"f07b4d12-7677-9d31-0ea8-3a3552fd7557","partenerid":"747a5655-7b08-9602-913d-dec617532d5e","divizie":"p11d22"},{"id":"f3e2fd1e-4ae9-d2ae-89c3-e484965dfd91","partenerid":"FRE","divizie":"d1"},{"id":"fd93dbbb-0388-3061-e7b1-9b6b82b89799","partenerid":"85bed424-1aab-5d77-2056-b281e5f75f33","divizie":"d2"},{"id":"fddde31b-1702-f0c6-9e04-373de3c775d8","partenerid":"017eb568-14c4-101a-7a08-698157d24ecd","divizie":"ass"}];

        // this.tasks = [{"id":"_00D395181E167","cod":null,"denumire":"qweqweqw","tip":null,"atributfiscal":null,"cui":null,"nrinmatriculare":null,"capitalsocial":null,"producator":0,"furnizor":0,"client":0,"activ":1,"platitortva":0,"website":null,"c1":null,"c2":null,"c3":null,"c4":null,"name":null,"dateCreate":null,"dateEdit":null,"userCreate":null,"userEdit":null},{"id":"_017630C69PICE","cod":null,"denumire":"SHAKER GORUP EGYPT","tip":null,"atributfiscal":null,"cui":null,"nrinmatriculare":null,"capitalsocial":null,"producator":0,"furnizor":0,"client":1,"activ":1,"platitortva":0,"website":null,"c1":null,"c2":null,"c3":null,"c4":null,"name":null,"dateCreate":null,"dateEdit":null,"userCreate":null,"userEdit":null},{"id":"_01EC85839PICE","cod":null,"denumire":"SABER ALEXANDRIA","tip":null,"atributfiscal":null,"cui":null,"nrinmatriculare":null,"capitalsocial":null,"producator":0,"furnizor":0,"client":1,"activ":1,"platitortva":0,"website":null,"c1":null,"c2":null,"c3":null,"c4":null,"name":null,"dateCreate":null,"dateEdit":null,"userCreate":null,"userEdit":null},{"id":"_054503018PICE","cod":null,"denumire":"MERLIN GERIN LOIRE","tip":null,"atributfiscal":null,"cui":null,"nrinmatriculare":null,"capitalsocial":null,"producator":0,"furnizor":0,"client":0,"activ":1,"platitortva":0,"website":null,"c1":null,"c2":null,"c3":null,"c4":null,"name":null,"dateCreate":null,"dateEdit":null,"userCreate":null,"userEdit":null},{"id":"_055A96425PICE","cod":null,"denumire":"SITO CONS CSRL, Caracal","tip":null,"atributfiscal":null,"cui":null,"nrinmatriculare":null,"capitalsocial":null,"producator":0,"furnizor":0,"client":1,"activ":1,"platitortva":0,"website":null,"c1":null,"c2":null,"c3":null,"c4":null,"name":null,"dateCreate":null,"dateEdit":null,"userCreate":null,"userEdit":null}];

        this.serviceBasel.ewolist("partenerxdivizie", null, null, null).then(data => {

            this.details = data;

            if (data.length > 0)
            {

                this.serviceBasel.ewolist("parteners", null, null, null).then(data2 => {

                    data2 = data2.filter(function (entry) {
                       let found = false;
                       for(var i in data) {
                        if (entry['id'] == data[i]['partenerid'])
                            found = true;
                        }
                        return found;
                    });
        
                    this.tasks = data2;
                });

            }
        });
    }

    getdivizie(partenerid){

        let result = [];

        for(var i in this.details) {
            if (this.details[i]['partenerid'] == partenerid)
                result.push(this.details[i]);
            }

        return result;    
    }

    // loaddetails(){
    //     let self = this;
    //     this.serviceBasel.ewolist("pmtaskdetails", null, null, null).then(data => {

    //         data = data.filter(function (entry) {
    //             return entry['taskid'] === self.taskid['id'];
    //         });

    //         this.details = data;
    //     });
    // }

    // setlogin() {
    //     this.tasks = [];
    //     this.details = [];
    //     localStorage.setItem('elttasklogin', this.email);
    //     this.loadpartners();

    //     this.login = this.email;
    // }
    // setlogout() {
    //     localStorage.setItem('elttasklogin', '0');
    //     this.login = '0';
    // }
    // starttask() {
    //     let item = {
    //         "id":this.guid(),
    //         "taskid":this.taskid['id'],
    //         "date1":formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss', 'en')
    //     };

    //     this.serviceBasel.ewosave("pmtaskdetails", item);
    //     this.details.push(item);
    // }

    // pausetask() {
    //     this.details[this.details.length-1]['date2'] = formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss', 'en');
    //     this.serviceBasel.ewosave("pmtaskdetails", this.details[this.details.length-1]);
    // }

    // playtask() {

    //     let item = {
    //         "id":this.guid(),
    //         "taskid":this.taskid['id'],
    //         "date1":formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss', 'en')
    //     };

    //     this.serviceBasel.ewosave("pmtaskdetails", item);
    //     this.details.push(item);
    // }

    // endtask() {
    //     if (!this.details[this.details.length-1]['date2'])
    //         this.details[this.details.length-1]['date2'] = formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss', 'en');

    //     this.details[this.details.length-1]['endtask'] = '1';    
    //     this.serviceBasel.ewosave("pmtaskdetails", this.details[this.details.length-1]);
    // }

    // setdetails(task){
    //     this.taskid = task;
    //     this.loaddetails();
    // }
}
