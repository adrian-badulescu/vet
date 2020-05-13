import { TestBed } from '@angular/core/testing';

import { PostingConfirmationService } from './posting-confirmation.service';

describe('PostingConfirmationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PostingConfirmationService = TestBed.get(PostingConfirmationService);
    expect(service).toBeTruthy();
  });
});
