import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../../../core/services/auth.service";
import {BaseService} from "../../_services/base.service";

@Component({
    selector: 'app-user-access',
    templateUrl: './user-access.component.html',
    styleUrls: ['./user-access.component.scss']
})
export class UserAccessComponent implements OnInit {
    sourceCars: any[];
    modules: any[];
    selectedUser;
    users = [];
    targetModules: any[];
    cols = [];

    constructor(private service: AuthenticationService,
                private baseService: BaseService) {
        this.baseService.entity = 'modules';
    }

    ngOnInit() {
        this.sourceCars = [{"brand": "VW", "year": 2012, "color": "Orange", "vin": "dsad231ff"},
            {"brand": "Audi", "year": 2011, "color": "Black", "vin": "gwregre345"},
            {"brand": "Renault", "year": 2005, "color": "Gray", "vin": "h354htr"},
            {"brand": "BMW", "year": 2003, "color": "Blue", "vin": "j6w54qgh"},
            {"brand": "Mercedes", "year": 1995, "color": "Orange", "vin": "hrtwy34"},
            {"brand": "Volvo", "year": 2005, "color": "Black", "vin": "jejtyj"},
            {"brand": "Honda", "year": 2012, "color": "Yellow", "vin": "g43gr"},
            {"brand": "Jaguar", "year": 2013, "color": "Orange", "vin": "greg34"},
            {"brand": "Ford", "year": 2000, "color": "Black", "vin": "h54hw5"},
            {"brand": "Fiat", "year": 2013, "color": "Red", "vin": "245t2s"}];
        this.getAllUsers();
        this.baseService.findAllItems().subscribe((data) => {
            this.modules = data;
        });
        this.cols = [
            {field: 'id', header: 'ID'},
            {field: 'email', header: 'Email'},
        ];
    }

    onChange(event) {
        console.log(event);
    }

    getAllUsers(){
        this.service.getAllUsers().subscribe((users) => {
            this.users = users;
        });
    }


    selectUser(event) {
        console.log(event);
        this.getModulesForUser();
        this.getModulesWithoutUser();
    }

    getModulesForUser() {
        this.baseService.findAllItems().subscribe((data) => {
            this.targetModules = data.filter((module) => this.selectedUser.modules.includes(module.code));
        });
    }

    getModulesWithoutUser() {
        this.baseService.findAllItems().subscribe((data) => {
            this.modules = data.filter((module) => !this.selectedUser.modules.includes(module.code));
        });
    }

    onMoveToTarget(event) {
        const id = this.selectedUser.id;
        delete this.selectedUser.id;
        this.selectedUser.modules = this.targetModules.map((module)=>{return module.code});
        this.service.updateUser(id, this.selectedUser).subscribe((data) => {
            this.getAllUsers();
        });
    }

    onMoveToSource(event) {
        const id = this.selectedUser.id;
        delete this.selectedUser.id;
        this.selectedUser.modules = this.targetModules.map((module)=>{return module.code});
        this.service.updateUser(id, this.selectedUser).subscribe((data)=>{
            this.getAllUsers();
        });
    }
}
