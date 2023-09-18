import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseModuleAddEditComponent } from './course-module-add-edit.component';

describe('ModuleAddEditComponent', () => {
  let component: CourseModuleAddEditComponent;
  let fixture: ComponentFixture<CourseModuleAddEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CourseModuleAddEditComponent]
    });
    fixture = TestBed.createComponent(CourseModuleAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
