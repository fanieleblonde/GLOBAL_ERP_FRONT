import { TestBed } from '@angular/core/testing';

import { SchoolWeightingService } from './school-weighting.service';

describe('SchoolWeightingService', () => {
  let service: SchoolWeightingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SchoolWeightingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
