

import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


import { StepperCls } from './stepper.model';
import { BaseService } from './../../_services/base.service';

@Component({
  selector: 'stepper',
  templateUrl: 'stepper.component.html',
  styleUrls: ['stepper.component.scss'],
  // providers: [EwoService, BaseService]
})
export class StepperComponent implements OnInit {
  item: StepperCls = new StepperCls();
  list: Array<StepperCls> = [];
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  stepsDone: Array<StepperCls> = [];

  constructor( private _formBuilder: FormBuilder, private service: BaseService) { this.service.entity = 'stepper'}

  ngOnInit() {
     
    this.firstFormGroup = this._formBuilder.group({
      id: '',
      surname: ['', Validators.required],
      forename: ['', Validators.required],
      email: ['', Validators.required]

    });
    this.secondFormGroup = this._formBuilder.group({
      address: ['', Validators.required],
      zipCode: ['', Validators.required],
      tel: ['', Validators.required]
    });

  
  }
  createItem() {


    this.item = {
      id: this.service.guid(),
      surname: this.firstFormGroup.get('surname').value,
      forename: this.firstFormGroup.get('forename').value,
      email: this.firstFormGroup.get('email').value,
      address: this.secondFormGroup.get('address').value,
      zipCode: this.secondFormGroup.get('zipCode').value,
      tel: this.secondFormGroup.get('tel').value
    };

    
   
    if(this.firstFormGroup.valid && this.secondFormGroup.valid){
      this.service._createItem(this.item).subscribe((data: any) => {
        (data => console.log('Done posting: ' + data));
      });
    }



    
   console.log(this.item);


  }



  onSubmit() {
    this.createItem();
   
}







}
