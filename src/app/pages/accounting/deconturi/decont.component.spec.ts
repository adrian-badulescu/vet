import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DecontComponent } from './decont.component';

describe('DecontComponent', () => {
  let component: DecontComponent;
  let fixture: ComponentFixture<DecontComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DecontComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DecontComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
