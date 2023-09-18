import { TestBed } from '@angular/core/testing';

import { ExspenseHeadingService } from './exspense-heading.service';

describe('ExspenseHeadingService', () => {
  let service: ExspenseHeadingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExspenseHeadingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
