import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccoutingnoteComponent } from './accountingnote.component';

describe('ContactsComponent', () => {
  let component: AccoutingnoteComponent;
  let fixture: ComponentFixture<InventoryListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccoutingnoteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccoutingnoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
