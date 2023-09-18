import { TestBed } from '@angular/core/testing';

import { StudregistrationService } from './studregistration.service';

describe('StudregistrationService', () => {
  let service: StudregistrationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StudregistrationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
