import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentIntershipAddEditComponent } from './student-intership-add-edit.component';

describe('StudentIntershipAddEditComponent', () => {
  let component: StudentIntershipAddEditComponent;
  let fixture: ComponentFixture<StudentIntershipAddEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudentIntershipAddEditComponent]
    });
    fixture = TestBed.createComponent(StudentIntershipAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
