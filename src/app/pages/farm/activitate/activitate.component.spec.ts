import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivitateComponent } from './activitate.component';

describe('ActivitateComponent', () => {
  let component: ActivitateComponent;
  let fixture: ComponentFixture<ActivitateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivitateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivitateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
