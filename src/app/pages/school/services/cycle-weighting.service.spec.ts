import { TestBed } from '@angular/core/testing';

import { CycleWeightingService } from './cycle-weighting.service';

describe('CycleWeightingService', () => {
  let service: CycleWeightingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CycleWeightingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
