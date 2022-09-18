import { TestBed } from '@angular/core/testing';

import { BonFiscalService } from './bon_fiscal.service';

describe('BonFiscalService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BonFiscalService = TestBed.get(BonFiscalService);
    expect(service).toBeTruthy();
  });
});
