
import { NgModule } from "@angular/core";
import { SortPipe } from "./sort";
import { BooleanPipe } from './boolean.pipe';


@NgModule({
    declarations: [SortPipe, BooleanPipe],
    exports: [SortPipe, BooleanPipe]
})
export class PipesModule {}