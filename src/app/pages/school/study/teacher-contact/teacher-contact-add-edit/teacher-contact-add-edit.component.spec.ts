import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherContactAddEditComponent } from './teacher-contact-add-edit.component';

describe('TeacherContactAddEditComponent', () => {
  let component: TeacherContactAddEditComponent;
  let fixture: ComponentFixture<TeacherContactAddEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TeacherContactAddEditComponent]
    });
    fixture = TestBed.createComponent(TeacherContactAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
