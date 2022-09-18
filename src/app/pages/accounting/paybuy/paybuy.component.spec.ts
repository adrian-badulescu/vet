import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaybuyComponent } from './paybuy.component';

describe('PaybuyComponent', () => {
  let component: PaybuyComponent;
  let fixture: ComponentFixture<PaybuyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaybuyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaybuyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
