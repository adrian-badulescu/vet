import { Component,OnInit,ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import {formatDate} from '@angular/common';
import { NgxSmartModalService } from 'ngx-smart-modal';

import {Base} from '../../_ewo/base';
import {BaseService} from '../../_ewo/service/service';

@Component({
  selector: 'task',
  styleUrls: ['./task.component.css'],
  templateUrl: './task.component.html',
  providers: [BaseService]
})
export class TaskComponent  extends Base implements OnInit{

    list:any[];
    user: any = {};
    listsearchtype:any=0; listsearchwords:any='';
    breadCrumbItems: Array<{}>;

    email="cbarusc@yahoo.com";
    taskid;
    login = '0';
    tasks=[];
    details=[];

    constructor(private serviceBasel:BaseService, private elementRef:ElementRef,
           public ngxSmartModalService: NgxSmartModalService, private router: Router) {
        super(serviceBasel);

        if (localStorage.getItem('elttasklogin') && localStorage.getItem('elttasklogin') != null)
            this.login = localStorage.getItem('elttasklogin');
    }

    ngOnInit() {

        this.breadCrumbItems = [{ label: 'Dashboard', path: '/' }, { label: 'Rapoarte', path: '/' }, { label: 'Task-uri', path: '/', active: true }];


        //this.entitytypeid = "users";
        //this.entityapi = "users";

        let self = this;

        // if (localStorage.getItem('currentUser')) {
        //     self.user = JSON.parse( localStorage.getItem('currentUser') );
        //     this.loadtask();
        // }

        this.login = 'a@a.ro';
        this.loadtask();

        this.details = [];

        // this.serviceBasel.ewolist("users", null, null, null).then(data => {
        //     this.list = data;
        // });

        //super.ngOnInit();
    }

    loadtask(){
        let self = this;
        this.tasks = [];

        this.serviceBasel.ewolist("hrorganigramas", null, null, null).then(data => {

            data = data.filter(function (entry) {
                return entry['email'] === self.email;
            });

            if (data.length > 0)
            {

                this.serviceBasel.ewolist("hremployeexdeps", null, null, null).then(data2 => {

                    data2 = data2.filter(function (entry) {
                        return entry['employeeid'] === data[0]['rcode'];
                    });
        
                    if (data2.length > 0)
                    {

                        this.serviceBasel.ewolist("pmtasks", null, null, null).then(data3 => {

                            data3 = data3.filter(function (entry) {
                                return entry['executantid'] === data2[0]['id'];
                            });
                
                            this.tasks = data3;
                        });
        
                    }
                });

            }
        });
    }

    loaddetails(){
        let self = this;
        this.serviceBasel.ewolist("pmtaskdetails", null, null, null).then(data => {

            data = data.filter(function (entry) {
                return entry['taskid'] === self.taskid['id'];
            });

            this.details = data;
        });
    }

    setlogin() {
        this.tasks = [];
        this.details = [];
        localStorage.setItem('elttasklogin', this.email);
        this.loadtask();

        this.login = this.email;
    }
    setlogout() {
        localStorage.setItem('elttasklogin', '0');
        this.login = '0';
    }
    starttask() {
        let item = {
            //"id":this.guid(),
            "taskid":this.taskid['id'],
            "date1":formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss', 'en')
        };

        this.serviceBasel.ewosave("pmtaskdetails", item);
        this.details.push(item);
    }

    pausetask() {
        this.details[this.details.length-1]['date2'] = formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss', 'en');
        this.serviceBasel.ewosave("pmtaskdetails", this.details[this.details.length-1]);
    }

    playtask() {

        let item = {
            //"id":this.guid(),
            "taskid":this.taskid['id'],
            "date1":formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss', 'en')
        };

        this.serviceBasel.ewosave("pmtaskdetails", item);
        this.details.push(item);
    }

    endtask() {
        if (!this.details[this.details.length-1]['date2'])
            this.details[this.details.length-1]['date2'] = formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss', 'en');

        this.details[this.details.length-1]['endtask'] = '1';    
        this.serviceBasel.ewosave("pmtaskdetails", this.details[this.details.length-1]);
    }

    setdetails(task){
        this.taskid = task;
        this.loaddetails();
        this.ngxSmartModalService.getModal('detaliitask').open();
    }

    closeDetaliiTask(){
        this.ngxSmartModalService.getModal('detaliitask').close();
      }
}
