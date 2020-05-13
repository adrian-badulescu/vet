import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimalGroupsComponent } from './animal-groups.component';

describe('AnimalGroupsComponent', () => {
  let component: AnimalGroupsComponent;
  let fixture: ComponentFixture<AnimalGroupsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnimalGroupsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnimalGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
