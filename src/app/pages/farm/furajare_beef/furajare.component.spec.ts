import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FurajareComponent } from './furajare.component';

describe('FurajareComponent', () => {
  let component: FurajareComponent;
  let fixture: ComponentFixture<FurajareComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FurajareComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FurajareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
