import { TestBed } from '@angular/core/testing';

import { RegistrationperclassService } from './registrationperclass.service';

describe('RegistrationperclassService', () => {
  let service: RegistrationperclassService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegistrationperclassService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
