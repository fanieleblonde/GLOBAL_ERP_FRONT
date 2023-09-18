import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NationalExamAddEditComponent } from './national-exam-add-edit.component';

describe('NationalExamAddEditComponent', () => {
  let component: NationalExamAddEditComponent;
  let fixture: ComponentFixture<NationalExamAddEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NationalExamAddEditComponent]
    });
    fixture = TestBed.createComponent(NationalExamAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
