import { TestBed } from '@angular/core/testing';

import { ApplicationSourceService } from './application-source.service';

describe('ApplicationSourceService', () => {
  let service: ApplicationSourceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApplicationSourceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
