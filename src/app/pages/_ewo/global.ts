import {Injectable} from '@angular/core';

@Injectable()
export class GlobalService {

    private item = {};

    setItem(value) {
        this.item = value;
    }

    getItem() {
        return this.item;
    }
}