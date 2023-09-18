import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolPeriodComponent } from './school-period.component';

describe('SchoolPeriodComponent', () => {
  let component: SchoolPeriodComponent;
  let fixture: ComponentFixture<SchoolPeriodComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SchoolPeriodComponent]
    });
    fixture = TestBed.createComponent(SchoolPeriodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
