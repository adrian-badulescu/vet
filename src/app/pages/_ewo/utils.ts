import { environment } from 'src/environments/environment';

export class EwoUtils {

    eworootpath: string;
    ewobaseurl: string;

    constructor() {
        this.eworootpath = 'data/';
        //this.ewobaseurl = 'http://81.12.235.14:3222/api/';
        this.ewobaseurl = environment.server.url+'/api/db-queries/execute/'; //'http://46.97.75.250:3223/'; //
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

    findSelectedItem(source, _item, id='id'):number {
        for (var key in source) {
            var item = source[key];
            if (item) {
                if (item[id] == _item[id])
                    return item;
            }
        }

        return -1;
    }

    findTree(source, _item) {
        for (var key in source) {
            var item = source[key];
            if (item.data) {
                if (item.data.id == _item.id)
                    return item;
            }

            // Item not returned yet. Search its children by recursive call.
            if (item.children) {
                var subresult = this.findTree(item.children, _item.code);

                // If the item was found in the subchildren, return it.
                if (subresult)
                    return subresult;
            }
        }
        // Nothing found yet? return null.
        return null;
    }
}