import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationperclassComponent } from './registrationperclass.component';

describe('RegistrationperclassComponent', () => {
  let component: RegistrationperclassComponent;
  let fixture: ComponentFixture<RegistrationperclassComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegistrationperclassComponent]
    });
    fixture = TestBed.createComponent(RegistrationperclassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
