import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UtilajComponent } from './utilaj.component';

describe('UtilajComponent', () => {
  let component: UtilajComponent;
  let fixture: ComponentFixture<UtilajComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UtilajComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UtilajComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
