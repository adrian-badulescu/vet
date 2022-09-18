import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminaliasComponent } from './adminalias.component';

describe('AdminaliasComponent', () => {
  let component: AdminaliasComponent;
  let fixture: ComponentFixture<AdminaliasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminaliasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminaliasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
