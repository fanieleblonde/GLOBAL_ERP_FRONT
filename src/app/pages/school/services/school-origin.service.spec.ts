import { TestBed } from '@angular/core/testing';

import { SchoolOriginService } from './school-origin.service';

describe('SchoolOriginService', () => {
  let service: SchoolOriginService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SchoolOriginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
