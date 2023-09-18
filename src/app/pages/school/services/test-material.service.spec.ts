import { TestBed } from '@angular/core/testing';

import { TestMaterialService } from './test-material.service';

describe('TestMaterialService', () => {
  let service: TestMaterialService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TestMaterialService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
