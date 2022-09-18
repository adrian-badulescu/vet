import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AvizexpeditieComponent } from './avizexpeditie.component';

describe('AvizexpeditieComponent', () => {
  let component: AvizexpeditieComponent;
  let fixture: ComponentFixture<AvizexpeditieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AvizexpeditieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AvizexpeditieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
