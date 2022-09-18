import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotarestituireComponent } from './notarestituire.component';

describe('NotarestituireComponent', () => {
  let component: NotarestituireComponent;
  let fixture: ComponentFixture<NotarestituireComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotarestituireComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotarestituireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
