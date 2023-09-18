import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentInternshipComponent } from './student-internship.component';

describe('StudentInternshipComponent', () => {
  let component: StudentInternshipComponent;
  let fixture: ComponentFixture<StudentInternshipComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudentInternshipComponent]
    });
    fixture = TestBed.createComponent(StudentInternshipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
