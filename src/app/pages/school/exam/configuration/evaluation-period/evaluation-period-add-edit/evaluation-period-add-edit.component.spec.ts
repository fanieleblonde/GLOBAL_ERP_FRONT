import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluationPeriodAddEditComponent } from './evaluation-period-add-edit.component';

describe('EvaluationPeriodAddEditComponent', () => {
  let component: EvaluationPeriodAddEditComponent;
  let fixture: ComponentFixture<EvaluationPeriodAddEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EvaluationPeriodAddEditComponent]
    });
    fixture = TestBed.createComponent(EvaluationPeriodAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
