import {Component, OnInit} from '@angular/core';
import {BaseService} from '../../_services/base.service';
import {Base} from '../../_ewo/base';
import {BaseService as EwoService} from "../../_ewo/service/service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
    selector: 'app-role-access',
    templateUrl: './role-access.component.html',
    styleUrls: ['./role-access.component.scss'],
    providers: [EwoService]
})
export class RoleAccessComponent extends Base implements OnInit {
    breadCrumbItems = [{label: 'Dashboard', path: '/'}, {label: 'Dev', path: '/'}, {
        label: 'Role Access',
        path: '/dev/role-access',
        active: true
    }];
    roleList: Array<any> = [];
    relationsList: Array<any> = [];
    moduleList: Array<any> = [];
    selectedRoles;
    role = null;
    displayDialog: boolean = false;
    formRoles: FormGroup;
    submitted: boolean;

    constructor(private service: BaseService, private serviceBase1: EwoService, private fb: FormBuilder) {
        super(serviceBase1);
    }

    ngOnInit() {
        this.service.findAllItemsEntity('roles').subscribe((data) => {
            console.log(data);
            this.roleList = data;
        });
        this.service.findAllItemsEntity('rolesxmodules').subscribe((data) => {
            this.relationsList = data;
        });

        this.formRoles = this.fb.group({
            id: [''],
            name: ['', [Validators.required]],
            code: ['', [Validators.required]],
            description: ['']
        });
    }

    get form() {
        return this.formRoles.controls;
    }

    onRowDblClick($event, rowData) {
        this.selectedRoles = rowData;
        this.getModulesforRole();
        console.log(this.moduleList);
        this.edit();
    }

    getModulesforRole() {
        const appearances = this.relationsList.filter((entry) => entry.roleId.toLowerCase() === this.selectedRoles.id.toLowerCase());
        this.moduleList = [];
        appearances.forEach((appearance) => {
            this.service.getItemEntity('modules', appearance.moduleId.toUpperCase()).subscribe((data) => {
                this.moduleList.push(data[0]);
            });
        });
    }

    add() {
        this.role = {};
        this.displayDialog = true;
        this.formRoles.reset();
        this.submitted = false;
    }

    edit() {
        if (!this.validSelection(this.selectedRoles))
            return;
        this.submitted = false;
        this.role = this.selectedRoles;
        this.formRoles.patchValue(this.role);
        this.displayDialog = true;
    }

    addNewModuleRow() {
        this.moduleList.push({
            id: this.service.guid(),
            code: '',
            denumire: '',
            action: 'add'
        });
    }

    onRowEditInit(rowData) {
        if (!rowData.action) rowData.action = 'edit';
    }

    onRowDelete(rowData, index) {
        this.moduleList.splice(index, 1);
    }

    onRowEditSave(rowData) {
        console.log(rowData);
    }


    onRowEditCancel(rowData, ri) {
    }

    onSubmit(values: any) {
        if (values.id == null) {
            delete values.id;
            this.service._createItemEntity('roles', values).subscribe(data => {
                this.moduleList.forEach((module) => {
                    if (module.action && module.action == 'add') {
                        delete module.action;
                        this.service._createItemEntity('modules', module).subscribe((data) => {
                            console.log(data);
                            module = data;
                        });
                    } else if (module.action && module.action == 'edit') {
                        delete module.action;
                        const moduleid = module.id;
                        delete module.id;
                        this.service.updateItemEntity('modules', moduleid, module).subscribe((data) => module = data);
                    }
                    this.service._createItemEntity('rolesxmodules', {
                        roleId: data.id,
                        moduleId: module.id
                    }).subscribe((data) => {
                        console.log(data);
                    });
                });
            });

        } else {
            this.relationsList.forEach((rel) => {
                console.log(values);
                if (rel.roleId.toLowerCase() === values.id.toLowerCase()) this.service.deleteItemEntity('rolesxmodules', rel.id).subscribe((data) => {
                    const roleId = values.id;
                    delete values.id;
                    this.service.updateItemEntity('roles', roleId, values).subscribe((data) => {
                        console.log(data);
                        this.moduleList.forEach((module) => {
                            let moduleid = null;
                            if (module.action && module.action == 'add') {
                                delete module.action;
                                this.service._createItemEntity('modules', module).subscribe((data) => {
                                    console.log(data);
                                    module = data;
                                });
                            } else if (module.action && module.action == 'edit') {
                                delete module.action;
                                moduleid = module.id;
                                delete module.id;
                                this.service.updateItemEntity('modules', moduleid, module).subscribe((data) => module = data);
                            }
                            console.log(roleId, moduleid);
                            this.service._createItemEntity('rolesxmodules', {
                                roleId: roleId,
                                moduleId: module.id ? module.id : moduleid
                            }).subscribe((data) => {
                                console.log(data);
                            });
                        });
                    });
                });
                else {
                    const roleId = values.id;
                    delete values.id;
                    this.service.updateItemEntity('roles', roleId, values).subscribe((data) => {
                        console.log(data);
                        this.moduleList.forEach((module) => {
                            if (module.action && module.action == 'add') {
                                delete module.action;
                                this.service._createItemEntity('modules', module).subscribe((data) => {
                                    console.log(data);
                                    module = data;
                                });
                            } else if (module.action && module.action == 'edit') {
                                delete module.action;
                                const moduleid = module.id;
                                delete module.id;
                                this.service.updateItemEntity('modules', moduleid, module).subscribe((data) => module = data);
                            }
                            console.log(roleId, module.id);
                            this.service._createItemEntity('rolesxmodules', {
                                roleId: roleId,
                                moduleId: module.id
                            }).subscribe((data) => {
                                console.log(data);
                            });
                        });
                    });
                }
            });

            //update
        }
    }
}
