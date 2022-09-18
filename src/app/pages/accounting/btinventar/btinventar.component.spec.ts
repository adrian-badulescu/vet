import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BtinventarComponent } from './btinventar.component';

describe('BtinventarComponent', () => {
  let component: BtinventarComponent;
  let fixture: ComponentFixture<BtinventarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BtinventarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BtinventarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
