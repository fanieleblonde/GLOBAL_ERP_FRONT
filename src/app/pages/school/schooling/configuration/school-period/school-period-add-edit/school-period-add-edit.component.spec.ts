import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolPeriodAddEditComponent } from './school-period-add-edit.component';

describe('SchoolPeriodAddEditComponent', () => {
  let component: SchoolPeriodAddEditComponent;
  let fixture: ComponentFixture<SchoolPeriodAddEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SchoolPeriodAddEditComponent]
    });
    fixture = TestBed.createComponent(SchoolPeriodAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
