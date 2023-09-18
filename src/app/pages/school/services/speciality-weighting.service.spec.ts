import { TestBed } from '@angular/core/testing';

import { SpecialityWeightingService } from './speciality-weighting.service';

describe('SpecialityWeightingService', () => {
  let service: SpecialityWeightingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpecialityWeightingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
