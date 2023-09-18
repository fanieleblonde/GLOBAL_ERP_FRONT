import { TestBed } from '@angular/core/testing';

import { StudoldregistrationService } from './studoldregistration.service';

describe('StudoldregistrationService', () => {
  let service: StudoldregistrationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StudoldregistrationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
