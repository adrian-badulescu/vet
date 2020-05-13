import {NgModule,Component, Output, EventEmitter} from '@angular/core';
import {CommonModule} from '@angular/common';

@Component({
    selector: 'admingrid',
    templateUrl: './admingrid.html'
})
export class AdminGridComponent {
    @Output() fields = new EventEmitter();
    @Output() columns = new EventEmitter();

    editfieldsclick () {
        this.fields.emit({})
    }

    editcolumnsclick () {
        this.columns.emit({})
    }

    constructor() { }
}

@NgModule({
    imports: [CommonModule],
    exports: [AdminGridComponent],
    declarations: [AdminGridComponent]
})
export class AdminGridModule { }