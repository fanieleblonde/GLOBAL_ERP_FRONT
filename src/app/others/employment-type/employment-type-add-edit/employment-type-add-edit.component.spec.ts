import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmploymentTypeAddEditComponent } from './employment-type-add-edit.component';

describe('EmploymentTypeAddEditComponent', () => {
  let component: EmploymentTypeAddEditComponent;
  let fixture: ComponentFixture<EmploymentTypeAddEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmploymentTypeAddEditComponent]
    });
    fixture = TestBed.createComponent(EmploymentTypeAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
