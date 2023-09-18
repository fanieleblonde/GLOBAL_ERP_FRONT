import { TestBed } from '@angular/core/testing';

import { SkillTypeService } from './skill-type.service';

describe('SkillTypeService', () => {
  let service: SkillTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SkillTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
