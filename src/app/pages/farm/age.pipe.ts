import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'agePipe'})
export class AgePipe implements PipeTransform {
    transform(value: object): string {

        // let ageJson = value;
        let  ageObj = value;
        return value ? ('Z:' + ageObj['d'] + ',L:' + ageObj['m'] +',A:' + ageObj['y'] ): 'Introdu data de nastere';
    }


}