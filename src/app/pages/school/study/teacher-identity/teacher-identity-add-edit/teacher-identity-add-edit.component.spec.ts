import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherIdentityAddEditComponent } from './teacher-identity-add-edit.component';

describe('TeacherIdentityAddEditComponent', () => {
  let component: TeacherIdentityAddEditComponent;
  let fixture: ComponentFixture<TeacherIdentityAddEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TeacherIdentityAddEditComponent]
    });
    fixture = TestBed.createComponent(TeacherIdentityAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
