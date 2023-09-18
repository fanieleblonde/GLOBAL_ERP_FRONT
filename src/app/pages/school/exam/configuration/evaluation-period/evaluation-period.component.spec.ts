import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluationPeriodComponent } from './evaluation-period.component';

describe('EvaluationPeriodComponent', () => {
  let component: EvaluationPeriodComponent;
  let fixture: ComponentFixture<EvaluationPeriodComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EvaluationPeriodComponent]
    });
    fixture = TestBed.createComponent(EvaluationPeriodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
