import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationperclassAddEditComponent } from './registrationperclass-add-edit.component';

describe('RegistrationperclassAddEditComponent', () => {
  let component: RegistrationperclassAddEditComponent;
  let fixture: ComponentFixture<RegistrationperclassAddEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegistrationperclassAddEditComponent]
    });
    fixture = TestBed.createComponent(RegistrationperclassAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
