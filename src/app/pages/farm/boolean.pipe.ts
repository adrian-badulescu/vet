import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'boolPipe'})
export class BooleanPipe implements PipeTransform {
    transform(value: number): string {
        return value ? 'Da' : 'Nu';
    }
}