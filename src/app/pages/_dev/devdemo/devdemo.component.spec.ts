import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DevdemoComponent } from './devdemo.component';

describe('DevdemoComponent', () => {
  let component: DevdemoComponent;
  let fixture: ComponentFixture<DevdemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DevdemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DevdemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
