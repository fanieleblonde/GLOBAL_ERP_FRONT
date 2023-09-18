import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmentAddEditComponent } from './department-add-edit.component';

describe('DepartmentAddEditComponent', () => {
  let component: DepartmentAddEditComponent;
  let fixture: ComponentFixture<DepartmentAddEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DepartmentAddEditComponent]
    });
    fixture = TestBed.createComponent(DepartmentAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
