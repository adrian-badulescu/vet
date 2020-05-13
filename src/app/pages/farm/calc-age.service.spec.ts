import { TestBed } from '@angular/core/testing';

import { CalcAgeService } from './calc-age.service';

describe('CalcAgeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CalcAgeService = TestBed.get(CalcAgeService);
    expect(service).toBeTruthy();
  });
});
