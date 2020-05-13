import {NgModule,Component, Output, EventEmitter} from '@angular/core';
import {CommonModule} from '@angular/common';

@Component({
    selector: 'adminprop',
    templateUrl: './adminprop.html'
})
export class AdminPropertiesComponent {
    @Output() control = new EventEmitter();
    @Output() fields = new EventEmitter();

    editcontrolclick () {
        this.control.emit({})
    }

    editfieldsclick () {
        this.fields.emit({})
    }

    constructor() { }
}

@NgModule({
    imports: [CommonModule],
    exports: [AdminPropertiesComponent],
    declarations: [AdminPropertiesComponent]
})
export class AdminPropertiesModule { }