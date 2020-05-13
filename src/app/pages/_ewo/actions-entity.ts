import {NgModule,Component, Input, Output, EventEmitter} from '@angular/core';
import {CommonModule} from '@angular/common';

@Component({
    selector: 'actions-entity',
    templateUrl: './actions-entity.html'
})
export class ActionsEntityComponent {
@Input() entity:string;
    @Output() show = new EventEmitter();

    constructor() {}

    showclick () {
        this.show.emit({})
    }
}

@NgModule({
    imports: [CommonModule],
    exports: [ActionsEntityComponent],
    declarations: [ActionsEntityComponent]
})
export class ActionsEntityModule { }