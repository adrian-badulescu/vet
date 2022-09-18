import { TestBed } from '@angular/core/testing';

import { CursService } from './curs.service';

describe('CursService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CursService = TestBed.get(CursService);
    expect(service).toBeTruthy();
  });
});
