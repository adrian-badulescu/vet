import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BonmaterialComponent } from './bonmaterial.component';

describe('BonmaterialComponent', () => {
  let component: BonmaterialComponent;
  let fixture: ComponentFixture<BonmaterialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BonmaterialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BonmaterialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
