import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TratamenteGrpComponent } from './tratamente_grup.component';

describe('TratamenteGrpComponent', () => {
  let component: TratamenteGrpComponent;
  let fixture: ComponentFixture<TratamenteGrpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TratamenteGrpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TratamenteGrpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
