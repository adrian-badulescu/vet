import { TestBed } from '@angular/core/testing';

import { ReceptieService } from './receptie.service';

describe('ReceptieService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ReceptieService = TestBed.get(ReceptieService);
    expect(service).toBeTruthy();
  });
});
