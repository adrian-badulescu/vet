import {NgModule,Component, Input, Output, EventEmitter} from '@angular/core';
import {CommonModule} from '@angular/common';

@Component({
    selector: 'actions',
    templateUrl: './actions.html'
})
export class ActionsComponent {
    @Input() admin:boolean;

    @Output() add = new EventEmitter();
    @Output() edit = new EventEmitter();
    @Output() delete = new EventEmitter();
    @Output() export = new EventEmitter();

    @Output() edittables = new EventEmitter();
    @Output() editfields = new EventEmitter();
    @Output() editproperties = new EventEmitter();

    addclick () {
        this.add.emit({})
    }
    editclick () {
        this.edit.emit({})
    }
    deleteclick () {
        this.delete.emit({})
    }
    exportclick () {
        this.export.emit({})
    }

    edittablesclick () {
        this.edittables.emit({})
    }
    editfieldsclick (table:string) {
        console.log(table);
        this.editfields.emit({})
    }
    editpropertiesclick (table:string) {
        console.log(table);
        this.editproperties.emit({})
    }

    constructor() { }
}

@NgModule({
    imports: [CommonModule],
    exports: [ActionsComponent],
    declarations: [ActionsComponent]
})
export class ActionsModule { }