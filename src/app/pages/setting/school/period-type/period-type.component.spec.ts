import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeriodTypeComponent } from './period-type.component';

describe('PeriodTypeComponent', () => {
  let component: PeriodTypeComponent;
  let fixture: ComponentFixture<PeriodTypeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PeriodTypeComponent]
    });
    fixture = TestBed.createComponent(PeriodTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
