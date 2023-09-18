import { TestBed } from '@angular/core/testing';

import { ContrackTemplateService } from './contrack-template.service';

describe('ContrackTemplateService', () => {
  let service: ContrackTemplateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContrackTemplateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
