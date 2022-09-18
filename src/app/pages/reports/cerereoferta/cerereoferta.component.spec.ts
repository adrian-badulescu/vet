import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CerereOfertaComponent } from './cerereoferta.component';

describe('OfertaComponent', () => {
  let component: CerereOfertaComponent;
  let fixture: ComponentFixture<CerereOfertaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CerereOfertaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CerereOfertaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
