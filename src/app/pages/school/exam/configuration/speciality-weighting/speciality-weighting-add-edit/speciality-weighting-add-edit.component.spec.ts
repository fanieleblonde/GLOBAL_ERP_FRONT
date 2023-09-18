import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialityWeightingAddEditComponent } from './speciality-weighting-add-edit.component';

describe('SpecialityWeightingAddEditComponent', () => {
  let component: SpecialityWeightingAddEditComponent;
  let fixture: ComponentFixture<SpecialityWeightingAddEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SpecialityWeightingAddEditComponent]
    });
    fixture = TestBed.createComponent(SpecialityWeightingAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
