import { TestBed } from '@angular/core/testing';

import { ModuleCategoryService } from './module-category.service';

describe('ModuleCategoryService', () => {
  let service: ModuleCategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModuleCategoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
