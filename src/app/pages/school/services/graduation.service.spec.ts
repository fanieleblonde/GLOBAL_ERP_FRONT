import { TestBed } from '@angular/core/testing';

import { GraduationService } from './graduation.service';

describe('GraduationService', () => {
  let service: GraduationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GraduationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
