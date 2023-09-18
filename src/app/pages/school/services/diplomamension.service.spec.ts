import { TestBed } from '@angular/core/testing';

import { DiplomamensionService } from './diplomamension.service';

describe('DiplomamensionService', () => {
  let service: DiplomamensionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DiplomamensionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
