import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceptieComponent } from './receptie.component';

describe('ReceptieComponent', () => {
  let component: ReceptieComponent;
  let fixture: ComponentFixture<ReceptieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReceptieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceptieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
