import { TestBed } from '@angular/core/testing';

import { SchoolSessionService } from './school-session.service';

describe('SchoolSessionService', () => {
  let service: SchoolSessionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SchoolSessionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
