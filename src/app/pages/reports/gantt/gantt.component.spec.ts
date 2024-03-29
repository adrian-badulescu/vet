import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GanttComponent } from './gantt.component';

describe('OfertaComponent', () => {
  let component: GanttComponent;
  let fixture: ComponentFixture<GanttComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GanttComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GanttComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
