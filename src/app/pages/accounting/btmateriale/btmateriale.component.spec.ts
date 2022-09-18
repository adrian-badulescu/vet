import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BtmaterialeComponent } from './btmateriale.component';

describe('BtmaterialeComponent', () => {
  let component: BtmaterialeComponent;
  let fixture: ComponentFixture<BtmaterialeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BtmaterialeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BtmaterialeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
