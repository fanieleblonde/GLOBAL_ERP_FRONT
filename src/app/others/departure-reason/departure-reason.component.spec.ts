import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartureReasonComponent } from './departure-reason.component';

describe('DepartureReasonComponent', () => {
  let component: DepartureReasonComponent;
  let fixture: ComponentFixture<DepartureReasonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DepartureReasonComponent]
    });
    fixture = TestBed.createComponent(DepartureReasonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
