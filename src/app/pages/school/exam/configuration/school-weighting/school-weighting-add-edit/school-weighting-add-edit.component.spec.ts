import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolWeightingAddEditComponent } from './school-weighting-add-edit.component';

describe('SchoolWeightingAddEditComponent', () => {
  let component: SchoolWeightingAddEditComponent;
  let fixture: ComponentFixture<SchoolWeightingAddEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SchoolWeightingAddEditComponent]
    });
    fixture = TestBed.createComponent(SchoolWeightingAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
