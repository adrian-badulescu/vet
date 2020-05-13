import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VaccinariComponent } from './vaccinari.component';

describe('VaccinariComponent', () => {
  let component: VaccinariComponent;
  let fixture: ComponentFixture<VaccinariComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VaccinariComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VaccinariComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
