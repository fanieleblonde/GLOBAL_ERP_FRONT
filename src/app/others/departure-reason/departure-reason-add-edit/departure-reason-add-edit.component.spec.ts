import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartureReasonAddEditComponent } from './departure-reason-add-edit.component';

describe('DepartureReasonAddEditComponent', () => {
  let component: DepartureReasonAddEditComponent;
  let fixture: ComponentFixture<DepartureReasonAddEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DepartureReasonAddEditComponent]
    });
    fixture = TestBed.createComponent(DepartureReasonAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
