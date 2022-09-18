import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotapredareComponent } from './notapredare.component';

describe('NotapredareComponent', () => {
  let component: NotapredareComponent;
  let fixture: ComponentFixture<NotapredareComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotapredareComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotapredareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
