import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectTypeComponent } from './subject-type.component';

describe('SubjectTypeComponent', () => {
  let component: SubjectTypeComponent;
  let fixture: ComponentFixture<SubjectTypeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SubjectTypeComponent]
    });
    fixture = TestBed.createComponent(SubjectTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
