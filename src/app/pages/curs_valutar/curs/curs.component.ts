
import { Component, OnInit, ViewChildren,  QueryList, ViewEncapsulation } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
// import { Router, ActivatedRoute } from '@angular/router';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
// import { of, Observable } from 'rxjs';

import { CursI } from './curs.model';


import { CursService } from './../curs.service';
import { AnimationQueryMetadata } from '@angular/animations';


@Component({
  selector: 'curs-valutar',
  templateUrl: './curs.component.html',
  styleUrls: ['./curs.component.scss'],
  providers: [CursService]

})

/**
 * InventoryList component - handling the inventorylist with sidebar and content
 */
export class CursComponent implements OnInit {

  curs: any;
  
  currency: CursI['currency'];
  date: CursI['date'];
  entity: string = '';
  cursLaData: string;
  
  


  // C: boolean = false;
  Currency: Array<string> = ['USD', 'EURO', 'Coroane suedeze', 'Lire sterline', 'Franci elvetieni', 'Dolari canadieni', 'Yeni japonezi', 'Ruble'];
  validationform: FormGroup;

  constructor(private modalService: NgbModal, public formBuilder: FormBuilder, private service: CursService) {
    this.validationform = this.formBuilder.group({
      date: [''],
      currency: ['']
    });
    
  }


  ngOnInit() {

    if (this.date && this.currency === (undefined || null)) {
      this.date = new Date();
      this.currency = '';
    }
  }

  // toggleC(): boolean {
  //   return this.C = !this.C;
  // }


  saveData() {
    const date = this.validationform.get('date').value;
    let currency = this.validationform.get('currency').value;

    this.curs = {
      date,
      currency,
    };


    if(this.validationform && currency === 'USD')
     {this.currency = 'usd';} else if (this.validationform && currency === 'EURO')
      {this.currency = 'eur';} else if (this.validationform && currency === 'Lire sterline') {this.currency = 'gbp';}
      else if (this.validationform && currency === 'Franci elvetieni') {this.currency = 'chf';} else if (this.validationform && currency === 'Dolari canadieni') {this.currency = 'cad';}
      else if (this.validationform && currency === 'Yeni japonezi') {this.currency = 'jpy';}
      else if (this.validationform && currency === 'Ruble') {this.currency = 'rub';}
      else {this.currency = 'sek';}



      this.modalService.dismissAll();
    // }

    this.date = date.replace(/-/g, '/');
    this.entity = this.date + '/' + this.currency + '.bnr';
    this.service.findCurs(this.entity).subscribe((data: any) => {
       this.cursLaData = data;
      console.log(this.cursLaData);
    });
    
    // this.service.findCurs(this.entity).subscribe(
    //   resp => {
    //     // display its headers
    //     const keys = resp.headers.keys();
    //     this.cursLaData = keys.map(key =>
    //       `${key}: ${resp.headers.get(key)}`);
 
    //     // access the body directly, which is typed as `Config`.
    //     this.curs = { ... resp.body };
    //   }
    // )
    console.log(this.cursLaData);
    // console.log(this.curs);
    console.log(this.date);
    console.log(this.currency);
    console.log(this.entity);
    
  }

  /**
 * Modal Open
 * @param content modal content
 */
  openModal(content: string) {
    this.modalService.open(content, { centered: true, size: 'sm' });
  }


  onSubmit(values: object, form, modal) {
    if (values) {
      //post
      this.saveData();
      this.closeModal(form, modal);
    }
  }


  closeModal(form, modal) {
    form.reset();
    modal('close');
  }


}
