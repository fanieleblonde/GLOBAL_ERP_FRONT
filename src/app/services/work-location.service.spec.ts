import { TestBed } from '@angular/core/testing';

import { WorkLocationService } from './work-location.service';

describe('WorkLocationService', () => {
  let service: WorkLocationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkLocationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
