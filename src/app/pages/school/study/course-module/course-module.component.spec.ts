import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseModuleComponent } from './course-module.component';

describe('ModuleComponent', () => {
  let component: CourseModuleComponent;
  let fixture: ComponentFixture<CourseModuleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CourseModuleComponent]
    });
    fixture = TestBed.createComponent(CourseModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
