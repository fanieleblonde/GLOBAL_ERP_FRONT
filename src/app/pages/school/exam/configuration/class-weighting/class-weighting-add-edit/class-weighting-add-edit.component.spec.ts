import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassWeightingAddEditComponent } from './class-weighting-add-edit.component';

describe('ClassWeightingAddEditComponent', () => {
  let component: ClassWeightingAddEditComponent;
  let fixture: ComponentFixture<ClassWeightingAddEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClassWeightingAddEditComponent]
    });
    fixture = TestBed.createComponent(ClassWeightingAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
