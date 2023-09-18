import { TestBed } from '@angular/core/testing';

import { SchoolPeriodService } from './school-period.service';

describe('SchoolPeriodService', () => {
  let service: SchoolPeriodService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SchoolPeriodService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
