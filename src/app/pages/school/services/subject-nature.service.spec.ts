import { TestBed } from '@angular/core/testing';

import { SubjectNatureService } from './subject-nature.service';

describe('SubjectNatureService', () => {
  let service: SubjectNatureService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubjectNatureService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
