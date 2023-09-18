import { TestBed } from '@angular/core/testing';

import { ResearchWorkService } from './research-work.service';

describe('ResearchWorkService', () => {
  let service: ResearchWorkService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResearchWorkService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
