import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductieComponent } from './productie.component';

describe('ProductieComponent', () => {
  let component: ProductieComponent;
  let fixture: ComponentFixture<ProductieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
