import { TestBed } from '@angular/core/testing';

import { ClassWeightingService } from './class-weighting.service';

describe('ClassWeightingService', () => {
  let service: ClassWeightingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClassWeightingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
