import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationperclassEditComponent } from './registrationperclass-edit.component';

describe('RegistrationperclassEditComponent', () => {
  let component: RegistrationperclassEditComponent;
  let fixture: ComponentFixture<RegistrationperclassEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegistrationperclassEditComponent]
    });
    fixture = TestBed.createComponent(RegistrationperclassEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
