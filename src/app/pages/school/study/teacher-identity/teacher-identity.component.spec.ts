import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherIdentityComponent } from './teacher-identity.component';

describe('TeacherIdentityComponent', () => {
  let component: TeacherIdentityComponent;
  let fixture: ComponentFixture<TeacherIdentityComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TeacherIdentityComponent]
    });
    fixture = TestBed.createComponent(TeacherIdentityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
