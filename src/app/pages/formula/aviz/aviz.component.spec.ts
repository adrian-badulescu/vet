import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AvizComponent } from './aviz.component';

describe('AvizComponent', () => {
  let component: AvizComponent;
  let fixture: ComponentFixture<AvizComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AvizComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AvizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
