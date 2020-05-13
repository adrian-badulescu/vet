import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BunuriComponent } from './bunuri.component';

describe('BunuriComponent', () => {
  let component: BunuriComponent;
  let fixture: ComponentFixture<BunuriComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BunuriComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BunuriComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
