
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StepperComponent } from './stepper/stepper.component';
import { StepperRoutingModule } from './stepper-routing.module';
import { MatInputModule, MatStepperModule, MatFormFieldModule, } from '@angular/material'

import { FormsModule, ReactiveFormsModule, } from '@angular/forms';
import { CdkTableModule } from '@angular/cdk/table';
import { FlexLayoutModule } from '@angular/flex-layout';





;

@NgModule({
  declarations: [StepperComponent],
  imports: [
    CommonModule,  MatStepperModule, CdkTableModule, MatStepperModule,FlexLayoutModule, MatFormFieldModule,
    StepperRoutingModule,  ReactiveFormsModule, FormsModule, MatInputModule],

})
export class StepperModule { }
