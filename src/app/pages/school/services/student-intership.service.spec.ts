import { TestBed } from '@angular/core/testing';

import { StudentIntershipService } from './student-intership.service';

describe('StudentIntershipService', () => {
  let service: StudentIntershipService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StudentIntershipService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
