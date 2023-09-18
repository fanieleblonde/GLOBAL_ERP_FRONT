import { TestBed } from '@angular/core/testing';

import { PentionschemeService } from './pentionscheme.service';

describe('PentionschemeService', () => {
  let service: PentionschemeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PentionschemeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
