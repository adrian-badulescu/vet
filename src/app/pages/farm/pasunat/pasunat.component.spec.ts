import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PasunatComponent } from './pasunat.component';

describe('PasunatComponent', () => {
  let component: PasunatComponent;
  let fixture: ComponentFixture<PasunatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PasunatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PasunatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
