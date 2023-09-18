import { TestBed } from '@angular/core/testing';

import { CashdeskService } from './cashdesk.service';

describe('CashdeskService', () => {
  let service: CashdeskService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CashdeskService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
