import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheltuialaObiectComponent } from './cheltuiala_obiect.component';

describe('CheltuialaObiectComponent', () => {
  let component: CheltuialaObiectComponent;
  let fixture: ComponentFixture<CheltuialaObiectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheltuialaObiectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheltuialaObiectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
