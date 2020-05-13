import { NgModule } from "@angular/core";
import { SortPipe } from "./sort";

@NgModule({
    declarations: [SortPipe],
    exports: [SortPipe]
})
export class PipesModule {}