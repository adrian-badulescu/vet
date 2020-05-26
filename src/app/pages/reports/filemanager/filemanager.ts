import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpResponse, HttpHeaders} from '@angular/common/http';
import {TreeNode, MenuItem} from 'primeng/api';
import {ContextMenuModule} from 'primeng/contextmenu';
import {FileUploadModule} from 'primeng/fileupload';
import {NgxSmartModalService} from 'ngx-smart-modal';
import {Observable, of, from} from 'rxjs';

import {environment} from 'src/environments/environment';

// import {Base} from '../../../../_ewo/base'
import {SelectItem, LazyLoadEvent, FilterMetadata} from 'primeng/components/common/api';

// import {BaseService} from '../../../../_ewo/service/service'
import {FolderFile} from './model/model';
import {FilemanagerService} from './service/service';
import {ValueConverter} from '@angular/compiler/src/render3/view/template';
import {ImageCroppedEvent} from "ngx-image-cropper";

@Component({
    selector: 'filemanager',
    // moduleId: module.id,
    templateUrl: './filemanager.html',
    styleUrls: ['./filemanager.css'],
    providers: [FilemanagerService]
})
export class FileManagerComponent implements OnInit {

    editormode;
    nodecurrent;
    modalContentLocal;
    items: MenuItem[];
    items2: MenuItem[];
    gridfiles = false;
    folders = [];
    files: any[];
    fileUploadList = [];
    images: any[];
    uploadedFiles: any[] = [];
    submit;

    listTip: SelectItem[];

    breadCrumbItems: Array<{}>;

    checkIfCrop: boolean = false;
    fileChangeEvent: any = '';
    imageC: any;
    private cropReady: boolean = false;

    constructor(public ngxSmartModalService: NgxSmartModalService,
                private service: FilemanagerService) {
        // super(serviceBase1);

        this.breadCrumbItems = [{label: 'Dashboard', path: '/'}, {label: 'Secretariat', path: '/'}, {
            label: 'Documente',
            path: '/',
            active: true
        }];

        this.items = [
            {label: 'Open', icon: 'fa fa-folder-open', command: (event) => this.setnodecurrent(this.nodecurrent)},
            {label: 'Rename', icon: 'fa fa-edit', command: (event) => this.edit()},
            {label: 'Delete', icon: 'fa fa-trash', command: (event) => this.delete()}
        ];

        this.items2 = [
            {label: 'Open', icon: 'fa fa-trash', command: (event) => this.delete()},
            {label: 'Rename', icon: 'fa fa-edit', command: (event) => this.edit()},
            {label: 'Delete', icon: 'fa fa-trash', command: (event) => this.delete()}
        ];

        // this.service.list(null,0,20).subscribe(all => this.folders = all);

        this.modalContentLocal = JSON.parse(JSON.stringify({}));

    }

    getFolders() {
        return this.service.findAllFolders().subscribe((data: FolderFile[]) => {
            this.folders = data.filter((folder) => folder.parinteId === '0').map((content) => {
                if (!content.isFile) {
                    return {
                        label: content.denumire,
                        data: content.description,
                        expandedIcon: 'fa fa-folder-open',
                        collapsedIcon: 'fa fa-folder',
                        parentid: content.parinteId,
                        isFile: content.isFile,
                        nameFile: '',
                        id: content.id,
                        children: [{}]
                    } as TreeNode;
                } else {
                    return {
                        label: content.denumire,
                        data: content.description,
                        icon: 'fa fa-file-image-o',
                        parentid: content.parinteId,
                        isFile: content.isFile,
                        nameFile: content.nameFile,
                        id: content.id
                    } as TreeNode;
                }
            });
            // this.folders = this.folders.filter( entry => {
            // return entry['type'] === '2';
        });
        //             .toPromise()
        //             .then(res => {
        //                 this.folders = <TreeNode[]> res.json().data;
        // /*                this.folders = this.folders.filter(function (entry) {
        //                     return entry['type'] === '2';
        //                 });*/
        //             });
    }

    getFolderById(id) {
        return this.service.getFolderById(id).subscribe((data) => {
            // this.nodecurrent = data;

            this.nodecurrent = data;
            this.nodecurrent['id'] = data.id;
            console.log('from getItem():  ' + JSON.stringify(data))
        });
    }

    ngOnInit() {
        // this.entitytypeid = "2";
        // this.entityapi = 'folders';

        // this.service.list(null,0,20).then(all => this.folders = all);

        // super.ngOnInit();
        this.getFolders();
    }

    setnodecurrent(node) { 
        if (this.nodecurrent) {
            this.nodecurrent.selected = false;
        }

        if (node == null) {
            this.files = [];
            this.buildImages();
            this.nodecurrent = null;
            return;
        }

        node.selected = true;
        this.nodecurrent = node;

        if (node.isFile){
            this.setnodecurrent(node.parent);
            return;
        }

        if (!node.expanded){

            this.service.findAllFolders().subscribe((data: FolderFile[]) => {

                node.children = data.filter((folder) => folder.parinteId === node.id.toString()).map((content) => {
                    if (!content.isFile) {
                        return {
                            label: content.denumire,
                            data: content.description,
                            expandedIcon: 'fa fa-folder-open',
                            collapsedIcon: 'fa fa-folder',
                            parentid: content.parinteId,
                            isFile: content.isFile,
                            nameFile: '',
                            id: content.id,
                            children: [{}]
                        } as TreeNode;
                    } else {
                        return {
                            label: content.denumire,
                            data: content.description,
                            icon: 'fa fa-file-image-o',
                            parentid: content.parinteId,
                            isFile: content.isFile,
                            nameFile: content.nameFile,
                            id: content.id
                        } as TreeNode;
                    }
                })

                this.files = this.nodecurrent.children && this.nodecurrent.children != [] ? this.nodecurrent.children : [];
                //this.files = this.nodecurrent.children && this.nodecurrent.children != [] ? this.nodecurrent.children.filter((file) => file.isFile) : [];

                this.nodecurrent.expanded = true;
            });
        }
        else {
            this.files = this.nodecurrent.children && this.nodecurrent.children != [] ? this.nodecurrent.children : [];
            //this.files = this.nodecurrent.children && this.nodecurrent.children != [] ? this.nodecurrent.children.filter((file) => file.isFile) : [];
        }

        this.buildImages();
    }

    addfolder() {

        this.editormode = 1;
        this.submit = false;

        this.modalContentLocal = 
        {
            denumire: "", 
            parinteId: "",
            description: "",
            isFile: 0,
            nameFile: ""
        };
        this.ngxSmartModalService.getModal('modalFolder').open();


    }

    createFolderFile(data) {
        return this.service._createFolder(data).subscribe((data: any) => {

            let node;

            if (!data.isFile) {
                node =  {
                    label: data.denumire,
                    data: data.description,
                    expandedIcon: 'fa fa-folder-open',
                    collapsedIcon: 'fa fa-folder',
                    parentid: data.parinteId,
                    isFile: data.isFile,
                    nameFile: '',
                    id: data.id,
                    children: []
                } as TreeNode;
            } else {
                node =  {
                    label: data.denumire,
                    data: data.description,
                    icon: 'fa fa-file-image-o',
                    parentid: data.parinteId,
                    isFile: data.isFile,
                    nameFile: data.nameFile,
                    id: data.id
                } as TreeNode;
            }    
    
            if (this.nodecurrent && this.nodecurrent["id"]){
                this.nodecurrent.children.push(node);
                this.nodecurrent.expanded = true;
            }
            else    
                this.folders.push(node);

                this.nodecurrent = node;
        });
    }

    updateFolderFile(id, body) { 

        body['isFile'] = (body['isFile'])?1:0;

        this.service.updateFolder(body['id'], body).subscribe(
            data => {
                if (!data.isFile) {
                    this.nodecurrent =  {
                        label: data.denumire,
                        data: data.description,
                        expandedIcon: 'fa fa-folder-open',
                        collapsedIcon: 'fa fa-folder',
                        parentid: data.parinteId,
                        isFile: data.isFile,
                        nameFile: '',
                        id: data.id,
                        children: []
                    } as TreeNode;
                } else {
                    this.nodecurrent =  {
                        label: data.denumire,
                        data: data.description,
                        icon: 'fa fa-file-image-o',
                        parentid: data.parinteId,
                        isFile: data.isFile,
                        nameFile: data.nameFile,
                        id: data.id
                    } as TreeNode;
                }  
            });
    }

    edit() {

        if (!this.nodecurrent) {
            return;
        }

        this.editormode = 2;
        this.submit = false;

        this.modalContentLocal = 
        {
            id: this.nodecurrent.id,
            denumire: this.nodecurrent.label, 
            parinteId: this.nodecurrent.parentid, 
            description: this.nodecurrent.data,
            isFile: this.nodecurrent.isFile,
            nameFile: this.nodecurrent.nameFile,
        };

        if (this.nodecurrent.expandedIcon) {
            this.ngxSmartModalService.getModal('modalFolder').open();


        } else {
            this.ngxSmartModalService.getModal('modalFile').open();
        }
        this.getFolders();
    }

    delete() {

        if (!this.nodecurrent.children || this.nodecurrent.children.length > 0) {
            alert(' exist children!');
        }

        if (!confirm('Continue?')) {
            return;
        }

        if (this.nodecurrent) {
            this.service.deleteFolder(this.nodecurrent['id']).subscribe(res => {
                if (this.nodecurrent.isFile) {
                    this.service.deleteFile(this.nodecurrent.label).subscribe((data) => {
                        console.log(data);
                    });
                }
                this.getFolders();
                // this.nodecurrent.id.splice(this.findSelectedItem(this.nodecurrent.id, this.nodecurrent), 1);
            });

        } else {

        }

    }

    savefolder(form) {

        this.submit = true;

        if (!form.valid) {
            return;
        }

        if (this.editormode == 1) {
            if (this.nodecurrent) {
                // this.nodecurrent.children.push(this.modalContentLocal);
                this.modalContentLocal.parinteId = this.nodecurrent.id;
                this.modalContentLocal.isFile = 0;
            } else {
                this.modalContentLocal.parinteId = 0;
                this.modalContentLocal.isFile = 0;
            }

            this.createFolderFile(this.modalContentLocal);
        }      
        else{
            this.updateFolderFile(this.modalContentLocal['id'], this.modalContentLocal);
        }

        this.ngxSmartModalService.getModal('modalFolder').close();
    }

    addfile() {

        if (!this.nodecurrent || !this.nodecurrent['id'])
            return;

        this.editormode = 1;
        this.submit = false;

        this.modalContentLocal = 
        {
            denumire: "", 
            parinteId: "",
            description: "",
            isFile: 0,
            nameFile: ""
        };

        this.ngxSmartModalService.getModal('modalFile').open();
    }

    closeModalFile() {
        this.ngxSmartModalService.getModal('modalFile').close();
        this.uploadedFiles = [];
    }

    savefile(form) {

        if (!this.nodecurrent || !this.nodecurrent['id'])
        return;
     
        this.submit = true;

        if (!form.valid) {
            return;
        }

        if (this.editormode == 1) {
            // this.nodecurrent.children.push(this.modalContentLocal);
            this.modalContentLocal.parinteId = this.nodecurrent.id;
            this.modalContentLocal.isFile = 1;

            this.createFolderFile(this.modalContentLocal);
        }      
        else{
            this.updateFolderFile(this.modalContentLocal['id'], this.modalContentLocal);
        }

        this.ngxSmartModalService.getModal('modalFile').close();

    }

    onNodeDblClick(event) {

        if (!event.node)
        return;
        
        //this.files = event.node.children && event.node.children != [{}] ? event.node.children.filter((file) => file.isFile) : [];
        this.buildImages();

        if (!event.node.isFile) {
            this.files = event.node.children && event.node.children != [{}] ? event.node.children.filter((file) => file.isFile) : [];
        }
        else if (event.node.isFile && event.node.nameFile) {
            this.service.getFile(event.node.nameFile).subscribe(data => {
                console.log('Report data...', data);
                var url = window.URL.createObjectURL(data);
                var a = document.createElement('a');
                document.body.appendChild(a);
                a.setAttribute('style', 'display: none');
                a.href = url;
                a.download = event.node.nameFile;
                a.click();
                window.URL.revokeObjectURL(url);
                a.remove();
            });
        }
    }

    onDblClick(item) {
        //this.files = item.children && item.children != [{}] ? item.children.filter((file) => file.isFile) : [];
        this.buildImages();

        if (!item.isFile) {
            this.setnodecurrent(item);
        }
        else if (item.isFile && item.nameFile) {
            this.service.getFile(item.nameFile).subscribe(data => {
                console.log('Report data...', data);
                var url = window.URL.createObjectURL(data);
                var a = document.createElement('a');
                document.body.appendChild(a);
                a.setAttribute('style', 'display: none');
                a.href = url;
                a.download = item.nameFile;
                a.click();
                window.URL.revokeObjectURL(url);
                a.remove();
            });
        }
    }

    nodeSelect(event) {
        this.setnodecurrent(event.node);
    }

    nodeUnselect(event) {
        event.node.selected = false;
    }

    nodeExpand(event) {
        if (event.node) {
            this.service.findAllFolders().subscribe((data: FolderFile[]) => {
                event.node.children = (data.filter((folder) => folder.parinteId === event.node.id.toString()).map((content) => {
                    if (!content.isFile) {
                        return {
                            label: content.denumire,
                            data: content.description,
                            expandedIcon: 'fa fa-folder-open',
                            collapsedIcon: 'fa fa-folder',
                            parentid: content.parinteId,
                            isFile: content.isFile,
                            nameFile: '',
                            id: content.id,
                            children: [{}]
                        } as TreeNode;
                    } else {
                        return {
                            label: content.denumire,
                            data: content.description,
                            icon: 'fa fa-file-image-o',
                            parentid: content.parinteId,
                            isFile: content.isFile,
                            nameFile: content.nameFile,
                            id: content.id
                        } as TreeNode;
                    }
                }));
                // this.folders = this.folders.filter( entry => {
                // return entry['type'] === '2';
            });
        }
    }

    getparents(node) {

        const parents = [];

        if (node && node.parent) {
            parents.push(node.parent);
            this.getparents(node.parent);
        }

        return parents;

    }

    expandAll(){
        this.folders.forEach( node => {
            this.expandRecursive(node, true);
        } );
    }

    collapseAll(){
        this.folders.forEach( node => {
            this.expandRecursive(node, false);
        } );
    }

    setgridfiles() {
        this.gridfiles = true;
    }

    setlistfiles() {
        this.gridfiles = false;
    }

    onUpload(event) {
        this.uploadedFiles = event.files;
        this.modalContentLocal.nameFile = event.originalEvent.body.file;
    }

    private expandRecursive(node: TreeNode, isExpand: boolean) {
        node.expanded = isExpand;
        if (node.children) {
            node.children.forEach(childNode => {
                this.expandRecursive(childNode, isExpand);
            });
        }
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

    findSelectedItem(source, _item, id = 'id'): number {
        for (let key in source) {
            let item = source[key];
            if (item) {
                if (item[id] == _item[id]) {
                    return parseInt(key);
                }
            }
        }

        return -1;
    }

    getFileExtension(filename: string) {
        return filename.split('.').pop();
    }

    isImage(name){

        if (!name)
        return false;

        if (this.getFileExtension(name) == 'jpg' || this.getFileExtension(name) == 'png' || this.getFileExtension(name) == 'jpeg')
        return true;

        return false;
    }

    buildImages() {
        return;
        this.images = [];
        // this.files.forEach((file, index)=>{
        //    if(file && file.isFile && this.isImage(file.label)) {
        //        this.images.push({
        //            source : environment.server.url+`/api/base/files/${file.label}`, thumbnail: environment.server.url+`api/base/files/${file.label}`, title: file.data
        //        });
        //        this.files.splice(this.files.indexOf(file), 1);
        //    }
        // });
        // for (let i = 0; i < this.files.length; i++) {
        //     const file = this.files[i];
        //     if (file && file.isFile && this.getFileExtension(file.nameFile) == 'jpg' || this.getFileExtension(file.nameFile) == 'png' || this.getFileExtension(file.nameFile) == 'jpeg') {
        //         this.images.push({
        //             source: environment.server.url+`api/base/files/${file.nameFile}`,
        //             thumbnail: environment.server.url+`/api/base/files/${file.nameFile}`,
        //             title: file.data
        //         });
        //         this.files.splice(i, 1);
        //         i--;
        //     }
        // }
    }

    onSelectFile(event) {
        console.log(event.files[0].name);
        console.log(this.files);
        this.fileChangeEvent = event.files[0];
    }

    checkIsImage() {
        if (this.fileChangeEvent !== '') {
            return this.getFileExtension(this.fileChangeEvent.name) === 'jpg' || this.getFileExtension(this.fileChangeEvent.name) === 'png' || this.getFileExtension(this.fileChangeEvent.name) === 'jpeg';
        }

    }

    cropImage() {
        this.checkIfCrop = true;
    }

    imageCropped(event: ImageCroppedEvent) {
        // const file = {...event.file, name: `blob.${event.file.type}`}
        const file = new File([event.file], `file.${event.file.type.substr(event.file.type.indexOf('/') + 1)}`, {type: event.file.type});
        this.imageC = {file: file, base64: event.base64};

    }

    confirmCrop() {
        this.cropReady = true;
        if (this.checkIfCrop) {
            this.fileUploadList = [this.imageC.file];
        }
    }


    onBeforeUpload(event) {
        // if (this.cropReady === true) {
        //     (event.formData as FormData).set('file', this.imageC.file);
        // }
    }
}
