import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeparazitariComponent } from './deparazitari.component';

describe('DeparazitariComponent', () => {
  let component: DeparazitariComponent;
  let fixture: ComponentFixture<DeparazitariComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeparazitariComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeparazitariComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
