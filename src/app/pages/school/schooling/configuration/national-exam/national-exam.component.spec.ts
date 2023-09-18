import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NationalExamComponent } from './national-exam.component';

describe('NationalExamComponent', () => {
  let component: NationalExamComponent;
  let fixture: ComponentFixture<NationalExamComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NationalExamComponent]
    });
    fixture = TestBed.createComponent(NationalExamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
