import { TestBed } from '@angular/core/testing';

import { AvizService } from './aviz.service';

describe('AvizService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AvizService = TestBed.get(AvizService);
    expect(service).toBeTruthy();
  });
});
